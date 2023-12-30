const express = require('express');
const cors = require('cors');

const mysql = require('mysql');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const app = express();

app.use(cors());
app.use(express.json());

// Port numer on which appliction will listen
const port = 3001;

// Connection to the database
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'test_database',
});

// Function to generate API key
const generateApiKey = () => {
    const apiKey = crypto.randomBytes(32).toString('hex');
    console.log('API key generated: ' + apiKey);
    return apiKey;
};

// Storing created API key
const generatedApiKey = generateApiKey();

// Middleware for API key verification
const apiKeyMiddleware = (request, response, next) => {
    const apiKey = request.headers['api-key'];

    // Check if API key is present and valid
    if (apiKey && apiKey === generatedApiKey) {
        next();
    } else {
        response.status(401).send('Unauthorized: Invalid API Key');
    }
};

// Endpoint creation
const createEndpoint = '/create';
const verifyUserEndpoint = '/verifyUser';
const verifyPasswordEndpoint = '/verifyPassword';

// Applying the API key middleware function
app.use(createEndpoint, apiKeyMiddleware);
app.use(verifyUserEndpoint,  apiKeyMiddleware);
app.use(verifyPasswordEndpoint, apiKeyMiddleware);

// Creating an API endpoint where the API will add data to the database
app.post( createEndpoint,  (request, response) => {
    const name = request.body.name;
    const surname = request.body.surname;
    const email = request.body.email;
    const hashedPassword = request.body.password;

    db.query(
        'INSERT INTO user_data (name, surname, email, password) VALUES (?, ?, ?, ?)',
        [name, surname, email, hashedPassword],
        (err, res) => {
            if (err) {
                console.log(err);
                response.status(500).send("Internal Server Error");
            } else {
                response.status(200).send("User created successfully");
                console.log("User created successfully");
            }
        }
    );
});

// Creating an API endpoint for authentication
app.post(verifyPasswordEndpoint, (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    db.query(
        'SELECT * FROM user_data WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                console.log(err);
                response.status(500).send("Internal Server Error");
            } else {
                if (results.length > 0) {
                    const storedHashedPassword = results[0].password;

                    // Use bcrypt to compare the provided password with the stored hashed password
                    bcrypt.compare(password, storedHashedPassword, (bcryptErr, bcryptResult) => {
                        if (bcryptErr) {
                            console.log(bcryptErr);
                            response.status(500).send("Internal Server Error");
                        } else {
                            if (bcryptResult) {
                                // Passwords match, authentication successful
                                response.status(200).send("Authentication successful");
                            } else {
                                // Passwords do not match
                                response.status(401).send("Unauthorized: Invalid email or password");
                                console.log("Unauthorized: Invalid password");
                            }
                        }
                    });
                } else {
                    // No user found with the provided email
                    console.log("Unauthorized: Invalid user");
                }
            }
        }
    );
});

app.post(verifyUserEndpoint, (request, response) => {
    const email = request.body.email;

    db.query(
        'SELECT * FROM user_data WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                console.log(err);
                response.status(500).send("Internal Server Error");
            } else {
                if (results.length > 0) {
                    // User Found with provided email
                } else {
                    // No user found with the provided email
                }
            }
        }
    );
});

app.listen(port, () => {
    console.log('server is running on port 3001');
});