// server.js file

var jsonServer = require('json-server');

// Returns an Express server
var server = jsonServer.create();

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

// Add custom routes
// server.get('/custom', function (req, res) { res.json({ msg: 'hello' }) })
server.put('/a', function (req, res) { res.json({ msg: 'hello' }) })

// Returns an Express router
var router = jsonServer.router('db.json');

server.use(router);

server.listen(3001); //3001 means it's on /fapi.


//actual endpoints

const express = require('express');
const mysql = require('mysql2/promise');
const userRoute =require('./user')

const app = express();

app.use(express.json()); // middleware for parsing JSON data
app.use("/users", userRoute)

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Luo12345',
  database: 'cse135'
});

const port = 3000;
/* app.get('/test', (req, res) => {
  // Generate a sample response
  const response = {
    message: 'This is a test endpoint',
    timestamp: new Date()
  };

  // Return the response as JSON
  res.json(response);
});
 */
app.post('/static', (req, res) => {
  const data = req.body;
  // Insert the data into the 'static' table
  pool.query(
    'INSERT INTO static ( userAgent, userLanguage, cookiesEnabled, javaScriptEnabled, imagesEnabled, cssEnabled, screenWidth, screenHeight, windowWidth, windowHeight, networkConnection) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )',
    [
      /* data.id, */
      data.userAgent,
      data.userLanguage,
      data.cookiesEnabled,
      data.javaScriptEnabled,
      data.imagesEnabled,
      data.cssEnabled,
      data.screenDimensions.width,
      data.screenDimensions.height,
      data.windowDimensions.width,
      data.windowDimensions.height,
      data.networkConnection
    ],
    (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        res.sendStatus(500);
      } else {
        console.log('Data inserted successfully');
        res.sendStatus(200);
      }
    }
  );
});
app.get('/static', async (req, res) => {
  try {
    const [results,] = await pool.query('SELECT * FROM static');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.sendStatus(500);
  }
});

app.post('/performance', (req, res) => {
  const startLoading = req.body.startLoading;
  const endLoading = req.body.endLoading;
  const loadTime = req.body.loadTime;

  pool.query('INSERT INTO performance (startLoading, endLoading, loadTime) VALUES (?, ?, ?)', [startLoading, endLoading, loadTime], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ status: 'error' });
    } else {
      res.status(200).json({ status: 'ok' });
    }
  });
});

app.get('/performance', async (req, res) => {
  try {
    const [results,] = await pool.query('SELECT * FROM performance');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.sendStatus(500);
  }
});




// HW4 part 0: (Rudy)
// Authentication
// Bcrypt --> password only
// JSON Web token --> login credential authentication
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Signup route
app.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;

  // Password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if the username already exists
    const [existingUser] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (existingUser.length > 0) {
      // Username already exists
      res.status(409).json({ success: false, message: 'Username already exists' });
    } else {
      // Store user details in the database
      await pool.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role]
      );
      res.status(201).json({ success: true, message: 'User created' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Use the json-server router for other routes
var router = jsonServer.router('db.json');
server.use(router);


// Login route
// const jwtSecret = "secretKey";
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Verifing credentials and return JWT
  pool.query(
    'SELECT * FROM users WHERE username = ?',
    username,
    async (error, results) => {
      if (error || results.length === 0) {
        res.status(401).send('Invalid credentials');
      } else {
        const user = results[0];

        // Check password
        if (await bcrypt.compare(password, user.password)) {
          // Create JWT
          const token = jwt.sign({ sub: user.id, role: user.role }, jwtSecret);
          res.status(200).json({ token });
        } else {
          res.status(401).send('Invalid credentials');
        }
      }
    }
  )
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});