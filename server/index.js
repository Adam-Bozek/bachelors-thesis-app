const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();
const mysql = require("mysql");

const fs = require("fs");
const https = require("https");
const crypto = require("crypto");
const MySQLStore = require("express-mysql-session")(session);

const { authenticateUser } = require("./utils");

/** TODO LIST
 *  TODO: handle wrong inputs to the endpoints properly
 *  TODO: add site where API keys will be generated
 *  TODO: create a database table for storing api keys based on something
 *  TODO: change this on line 84: secret: 'your-secret-key'
 *  TODO: Finish user logout endpoint
 *  TODO: THINK OF HOW TO SEND COOKIES TO USER
 */

const corsOptions = {
	origin: (origin, callback) => {
		// Check if the origin is allowed
		if (!origin || origin === "https://localhost:3000") {
			callback(null, true); // Allow the request
		} else {
			callback(new Error("Not allowed by CORS")); // Block the request
		}
	},
	credentials: true, // Allow cookies to be sent with the request
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// IP address and port number on which application will run
const IP_ADDRESS = "localhost";
const PORT = process.env.PORT || 3001;

// Credentials for https protocol
const privateKey = fs.readFileSync(`./keys/localhost/${IP_ADDRESS}-key.pem`, "utf8");
const certificate = fs.readFileSync(`./keys/localhost/${IP_ADDRESS}.pem`, "utf8");
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

// Database configuration
const DBConfig = {
	host: "localhost",
	user: "root",
	password: "",
	database: "test_database",
};

// Create a MySQL connection pool
const connectionPool = mysql.createPool(DBConfig);

// Database connection test
connectionPool.getConnection((connectionError, connection) => {
	if (connectionError) {
		console.error("DATABASE CONNECTION: Unable to get a connection from the pool:", connectionError);
		process.exit(1);
	}

	console.log("DATABASE CONNECTION: Connected to the database successfully.");

	// Release the connection back to the pool
	connection.release();
});

// Handle database connection errors
connectionPool.on("error", (poolError) => {
	console.error("DATABASE CONNECTION: Pool error:", poolError);
	process.exit(1);
});

// Setup MySQL session store
const sessionStore = new MySQLStore(
	{
		clearExpired: true,
		checkExpirationInterval: 1000 * 60 * 20, // 20 minutes
		expiration: 1000 * 60 * 60 * 1, // 1 hour
		createDatabaseTable: true,
		schema: {
			tableName: "sessions",
			columnNames: {
				session_id: "session_id",
				expires: "expires",
				data: "data",
			},
		},
	},
	connectionPool,
);

// Use express-session middleware with MySQL session store
app.use(
	session({
		secret: "your-lol-key",
		resave: true,
		saveUninitialized: true,
		store: sessionStore,
		cookie: {
			maxAge: 1000 * 60 * 60 * 5, // 5 hours
			secure: true,
		},
	}),
);

// Function to generate random API key
// On return there should be a random API key
const generateApiKey = () => {
	const apiKey = crypto.randomBytes(32).toString("hex");
	console.log("API KEY GEN: API key generated: " + apiKey);
	return apiKey;
};

// Path to the file storing the API key
const apiKeyFilePath = "./keys/api-key.txt";

// Function to read the API key from the file or generate a new one if not present
const readOrGenerateApiKey = () => {
	try {
		// Try to read the API key from the file
		const apiKey = fs.readFileSync(apiKeyFilePath, "utf8");
		console.log("API KEY READ: API key read from file: " + apiKey);
		return apiKey;
	} catch (error) {
		// File not found or other error, generate a new API key
		const newApiKey = generateApiKey();
		// Save the new API key to the file
		fs.writeFileSync(apiKeyFilePath, newApiKey, "utf8");
		return newApiKey;
	}
};

// Storing created or read API key
const generatedApiKey = readOrGenerateApiKey();

// Middleware function authenticating API access
const apiMiddleware = (request, response, next) => {
	try {
		const apiKey = request.headers["api-key"];

		// Check if API key is present and valid
		if (apiKey && apiKey === generatedApiKey) {
			next();
		} else {
			response.status(401).send("API AUTH: Unauthorized - Invalid API Key");
		}
	} catch (error) {
		response.status(500).send("API AUTH: Internal Server Error");
	}
};

// Endpoint creation
const userRegisterEndpoint = "/userRegister";
const userLoginEndpoint = "/userLogin";
const verifyUserExistenceEndpoint = "/verifyUserExistence";
const userLogoutEndpoint = "/userLogout";

// Applying the API key middleware function
app.use(apiMiddleware);

// Creating an API endpoint where the API will add new user to the database
app.post(userRegisterEndpoint, (request, response) => {
	const name = request.body.name;
	const surname = request.body.surname;
	const email = request.body.email;
	const hashedPassword = request.body.password;

	connectionPool.query(
		"INSERT INTO user_data (name, surname, email, password) VALUES (?, ?, ?, ?)",
		[name, surname, email, hashedPassword],
		(err, res) => {
			if (err) {
				console.error("USER REGISTRATION: Internal Server Error" + err.message);
				response.status(500).send("Internal Server Error");
			} else {
				console.log("USER REGISTRATION: User created successfully");
				response.status(200).send("User created successfully");
			}
		},
	);
});

// Creating an API endpoint for authentication of Login
app.get(userLoginEndpoint, (request, response) => {
	const email = request.query.param1;
	const password = request.query.param2;

	connectionPool.query("SELECT * FROM user_data WHERE email = ?", [email], (err, results) => {
		if (err) {
			console.err("USER LOGIN: " + err);
			response.status(500).send("Internal Server Error");
		} else {
			// Definition of this function and functions which this function uses are located in utils.js
			authenticateUser(results, password, request, response);
		}
	});
});

// Creating an API endpoint to check if user with the provided email exists
app.post(verifyUserExistenceEndpoint, (request, response) => {
	const email = request.body.email;

	connectionPool.query("SELECT * FROM user_data WHERE email = ?", [email], (err, results) => {
		if (err) {
			console.error("VERIFY USER: " + err);
			response.status(500).send("USER EXISTENCE: Internal Server Error");
		} else {
			if (results.length > 0) {
				// User Found with provided email
				console.log("VERIFY USER: User with provided email was found.");
				response.status(404).send("Email address already in use");
			} else {
				// No user found with the provided email
				console.log("VERIFY USER: No user with provided email found");
				response.status(200).send("No user found with the provided email");
			}
		}
	});
});

// Creating an API endpoint for user logout
app.get(userLogoutEndpoint, (request, response) => {
	// Check if session exists
	if (!request.session) {
		console.error("USER LOGOUT: Session doesn't exist");
		return response.status(400).send("USER LOGOUT: Bad Request: Session doesn't exist");
	} else {
		// Destroy session in session store
		sessionStore.destroy(request.session.id, (error) => {
			if (error) {
				console.error("USER LOGOUT: Error destroying session from session store", error);
				return response.status(500).send("USER LOGOUT: Internal Server Error");
			}

			// Destroy session
			request.session.destroy((err) => {
				if (err) {
					console.error("USER LOGOUT: Error destroying session", err);
					return response.status(500).send("USER LOGOUT: Internal Server Error");
				}
				console.log("USER LOGOUT: Logout Successful");
				response.status(200).send("Logout successful");
			});
		});
	}
});

httpsServer.listen(PORT, IP_ADDRESS, () => {
	console.log(`Server is running on https://${IP_ADDRESS}:${PORT}`);
});
