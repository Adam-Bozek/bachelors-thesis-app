const express = require("express");
const cors = require("cors");
const session = require('express-session')
const escapeHtml = require('escape-html')

const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const fs = require("fs");
const https = require("https");
const crypto = require("crypto");
const MySQLStore = require('express-mysql-session')(session);

app.use(cors());
app.use(express.json());

// Port numer on which appliction will listen
const PORT = process.env.PORT || 3001;

// Credentials fro https protocol
const privateKey = fs.readFileSync("./keys/localhost-key.pem", "utf8");
const certificate = fs.readFileSync("./keys/localhost.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

// Database configuration
const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "test_database",
};

// Create a MySQL connection pool
const connectionPool = mysql.createPool(dbConfig);

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
    checkExpirationInterval: 1000 * 60 * 20,
    expiration: 1000 * 60 * 60 * 24,
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
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 12,
        secure: true,
    },
}));

const sessionMiddleware = (request, response, next) => {
    if (request.session.user) {next();}
    else {response.status(401).send("Unauthorized: User session not found");}
};

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

// Middleware function authenticating API and session access
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

// Creating an API endpoint where the API will add data to the database
app.post(userRegisterEndpoint, express.urlencoded({ extended: false }), (request, response) => {
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

// Creating an API endpoint for authentication of Login
app.post(userLoginEndpoint, express.urlencoded({ extended: false }), (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    connectionPool.query(
        "SELECT * FROM user_data WHERE email = ?",
        [email],
        (err, results) => {
            if (err) {
                console.log("USER LOGIN: " + err);
                response.status(500).send("Internal Server Error");
            } else {
                if (results.length > 0) {
                    const storedHashedPassword = results[0].password;

                    bcrypt.compare(password, storedHashedPassword, (bcryptErr, bcryptResult) => {
                        if (bcryptErr) {
                            console.log("USER LOGIN: " + bcryptErr);
                            response.status(500).send("Internal Server Error");
                        } else {
                            if (bcryptResult) {
                                // Passwords match, authentication successful
                                console.log("USER LOGIN: Authentication successful LOL");

                                // Regenerate session
                                request.session.regenerate((sessionErr) => {
                                    if (sessionErr) {
                                        console.log("USER LOGIN: " + sessionErr);
                                        response.status(500).send("Internal Server Error");
                                    } else {
                                        // Store user information in the session
                                        request.session.user = email;

                                        // Save the session before redirection
                                        request.session.save((saveErr) => {
                                            if (saveErr) {
                                                console.log("USER LOGIN: " + saveErr);
                                                response.status(500).send("Internal Server Error");
                                            } else {
                                                response.status(200).send("Authentication successful");
                
                                            }
                                        });
                                    }
                                });
                            } else {
                                // Passwords do not match
                                response.status(401).send("Unauthorized: Invalid email or password");
                                console.log("USER LOGIN: Unauthorized: Invalid password");
                            }
                        }
                    });
                } else {
                    // No user found with the provided email
                    console.log("USER LOGIN: Unauthorized: Invalid user");
                    response.status(401).send("Unauthorized: Invalid email or password");
                }
            }
        }
    );
});

// Creating an API endpoint for chceck if user with the provided email exists
app.post(verifyUserExistanceEndpoint, express.urlencoded({ extended: false }), (request, response) => {
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

httpsServer.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});