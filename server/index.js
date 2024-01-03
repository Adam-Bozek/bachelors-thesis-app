const express = require("express");
const cors = require("cors");
const session = require('express-session')

const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const fs = require("fs");
const https = require("https");
const crypto = require("crypto");

app.use(cors());
app.use(express.json());

// Port numer on which appliction will listen
const port = 3001;

const privateKey = fs.readFileSync("./keys/localhost-key.pem", "utf8");
const certificate = fs.readFileSync("./keys/localhost.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

// Connection to the database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "test_database",
});

// Database connection test
db.connect((err) => {
    if (err) {
        console.error("DATABASE CONNECTION: FATAL error connecting to the database:", err);
        process.exit(1);
    }
    console.log("DATABASE CONNECTION: Connected to the database succesfully");
});

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

// Middleware for API key verification
const apiKeyMiddleware = (request, response, next) => {
    try {
        const apiKey = request.headers["api-key"];
        // Check if API key is present and valid
        if (apiKey && apiKey === generatedApiKey) {
            next();
        } else {
            response.status(401).send("API AUTH: Unauthorized - Invalid API Key");
        }
    } catch (error) {
        response.status(500).send("API AUTH - Internal Server Error");
    }
};

// Endpoint creation
const createEndpoint = "/create";
const verifyUserLoginEndpoint = "/verifyUserLogin";
const verifyUserExistanceEndpoint = "/verifyUserExistance";

// Applying the API key middleware function
app.use(createEndpoint, apiKeyMiddleware);
app.use(verifyUserLoginEndpoint, apiKeyMiddleware);
app.use(verifyUserExistanceEndpoint, apiKeyMiddleware);

// Creating an API endpoint where the API will add data to the database
app.post(createEndpoint, (request, response) => {
    const name = request.body.name;
    const surname = request.body.surname;
    const email = request.body.email;
    const hashedPassword = request.body.password;

    console.log()

    db.query(
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
app.post(verifyUserLoginEndpoint, (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    db.query(
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
                                console.log("USER LOGIN: Authentification successful");
                                response.status(200).send("Authentication successful");
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
                }
            }
        }
    );
});

// Creating an API endpoint for chceck if user with the provided email exists
app.post(verifyUserExistanceEndpoint, (request, response) => {
    const email = request.body.email;

    db.query(
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

httpsServer.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});