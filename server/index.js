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


// Applying the API key middleware function
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

app.listen(port, () => {
    console.log('server is running on port 3001');
});