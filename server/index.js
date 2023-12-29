const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost', // Change 'hostname' to 'host'
    password: '',
    database: 'test_database',
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        'INSERT INTO registration_data (name, surname, email, password) VALUES (?, ?, ?, ?)',
        [name, surname, email, password],
        (err, result) => {
            if (err) {
                console.log(err);
            } else if (result) {
                console.log(result);
            }
        }
    );

})

app.get("/registration", (req, res) => {
    let sortBy = req.query.sortBy || 'name'; // Default to sorting by name if sortBy is not provided
    let sortOrder = req.query.order || 'asc'; // Default to ascending order if order is not provided

    const query = `SELECT * FROM registration_data ORDER BY ${sortBy} ${sortOrder}`;

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

app.listen(port, () => {
    console.log('server is running on port 3001');
});