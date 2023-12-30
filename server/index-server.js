const express = require('express');
const cors = require('cors');

const mysql = require('mysql');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const saltRounds = 10;

const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;

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
const customApiKey = generateApiKey();

// Middleware for API key verification
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['api-key'];

    // Check if API key is present and valid
    if (apiKey && apiKey === customApiKey) {
        next(); // Move to the next middleware or route handler
    } else {
        res.status(401).send('Unauthorized: Invalid API Key');
    }
};

app.use('/create', apiKeyMiddleware);
app.use('/compare', apiKeyMiddleware);

// Creating an API endpoint where the API will add daata to the database
app.post('/create', (req, response) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const hashedPassword = req.body.password;

    db.query(
        'INSERT INTO user_data (name, surname, email, password) VALUES (?, ?, ?, ?)',
        [name, surname, email, hashedPassword],
        (err, res) => {
            if (err) {
                console.log(err);
                response.status(500).send("Internal Server Error");
            } else {
                response.status(200).send("User created successfully");
            }
        }
    );
});



// Creating an API endpoint where the API will compare two passwords
app.post('/compare', (req, res) => {
    const userPassword = req.body.userPassword;
    const userEmail = req.body.userEmail;

    const query = 'SELECT password FROM user_data WHERE email = ?';

    db.query(query, [userEmail], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            if (result.length === 0) {
                // User with the given email not found
                res.send(false);
            } else {
                const hashedPassword = result[0].password;
                res.send(hashedPassword === userPassword);
            }
        }
    });
});

app.listen(port, () => {
    console.log('server is running on port 3001');
});