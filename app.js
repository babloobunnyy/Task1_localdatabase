const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs'); // Import EJS
const app = express();

// Database connection settings
const db = mysql.createConnection({
    host: 'localhost',
    user: '',//your sql user name
    password: '',//your sql password
    database: 'babloo'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection error: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});


// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));



// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, dob, address, phone, gender } = req.body;

    // Insert data into the database
    const sql = 'INSERT INTO users (name, email, dob, address, phone, gender) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, email, dob, address, phone, gender];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database query error: ' + err.message);
            res.status(500).send('Error saving data');
            return;
        }

        console.log('Data submitted successfully');
        res.redirect('/submitted-data');
    });

    // Define a route to display the submitted data
app.get('/submitted-data', (req, res) => {
    // Fetch the data from the MySQL database (replace with your SQL query)
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Database query error: ' + err.message);
            res.status(500).send('Error fetching data');
            return;
        }

        // Render a template (e.g., using EJS) to display the data
        res.render('submitted-data.ejs', { users: results });
    });
});

});

// Start the server
const port = 3030;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
