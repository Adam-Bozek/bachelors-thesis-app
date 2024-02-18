const express = require("express");
const cors = require("cors");
const session = require('express-session')

const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const fs = require("fs");
const https = require("https");
const crypto = require("crypto");
const MySQLStore = require('express-mysql-session')(session);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// IP address and port number on which application will run
const IP_ADDRESS = "192.168.36.200";
const PORT = process.env.PORT || 3001;

// Credentials for https protocol
const privateKey = fs.readFileSync(`./keys/IP/${IP_ADDRESS}-key.pem`, "utf8");
const certificate = fs.readFileSync(`./keys/IP/${IP_ADDRESS}.pem`, "utf8");
const credentials = { key: privateKey, cert: certificate };

// Creating https server
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

    console.log("DATABASE CONNECTION: Connected to the database successfully");

    // Release the connection back to the pool
    connection.release();
});

// Handle database connection errors
connectionPool.on('error', (poolError) => {
    console.error("DATABASE CONNECTION: Pool error:", poolError);
    process.exit(1);
});

// Setup MySQL session store
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 1000 * 60 * 20, // 20 minutes
    expiration: 1000 * 60 * 60 * 24, // 24 hours
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    },
}, connectionPool);

// Use express-session middleware with MySQL session store
app.use(session({
    secret: 'your-lol-key',
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 12, // 12 hours
        secure: true,
    },
}));

// Function to generate random API key
// On return there sould be a random API key
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
const verifyUserExistanceEndpoint = "/verifyUserExistance";
const userLogoutEndpoint = "/userLogout";

// Applying the API key middleware function
app.use(userRegisterEndpoint, apiMiddleware);
app.use(userLoginEndpoint, apiMiddleware);
app.use(verifyUserExistanceEndpoint, apiMiddleware);
app.use(userLogoutEndpoint, apiMiddleware);

// Creating an API endpoint where the API will add new user to the database
app.post(userRegisterEndpoint, (request, response) => {
    const name = request.body.name;
    const surname = request.body.surname;
    const email = request.body.email;
    const hashedPassword = request.body.password;

    console.log()

    connectionPool.query(
        "INSERT INTO user_data (name, surname, email, password) VALUES (?, ?, ?, ?)",
        [name, surname, email, hashedPassword],
        (err, res) => {
            if (err) {
                console.log(err);
                console.log("REGISTER: Internal Server Error");
                response.status(500).send("Internal Server Error");
            } else {
                response.status(200).send("User created successfully");
                console.log("REGISTER: User created successfully");
            }
        }
    );
});


// Creating an API endpoint for authentication if user exists already
app.post

// Create an API endpoint for user Login authentication
app.get

// Creating an API endpoint to chceck if user with the provided email exists
app.post(verifyUserExistanceEndpoint, (request, response) => {
    const email = request.body.email;

    connectionPool.query(
        "SELECT * FROM user_data WHERE email = ?",
        [email],
        (err, results) => {
            if (err) {
                console.log(err);
                response.status(500).send("USER EXISTANCE: Internal Server Error");
            } else {
                if (results.length > 0) {
                    // User Found with provided email
                    response.status(404).send("Email address allready in use");
                } else {
                    // No user found with the provided email
                    response.status(200).send("No user found with the provided email");
                }
            }
        }
    );
});

// Creating an API endpoint for user logout
app.post(userLogoutEndpoint, (request, response) => {
    if (!request.session) {
        // Session doesn't exist, handle accordingly
        console.error("USER LOGOUT: Session doesn't exist");
        response.status(400).send("Bad Request: Session doesn't exist");
        return;
    }

    request.session.destroy((err) => {
        if (err) {
            console.error("USER LOGOUT: " + err);
            response.status(500).send("Internal Server Error");
        } else {
            // Remove session data from the database
            const sessionId = request.session.id;
            connectionPool.query(
                "DELETE FROM sessions WHERE session_id = ?",
                [sessionId],
                (deleteErr, result) => {
                    if (deleteErr) {
                        console.error("Error deleting session from database:", deleteErr);
                        response.status(500).send("Internal Server Error");
                    } else {
                        console.log("USER LOGOUT: Logout Successful");
                        response.status(200).send("Logout successful");
                    }
                }
            );
        }
    });
});

// App listening on port
httpsServer.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server is running on https://${IP_ADDRESS}:${PORT}`);
});
