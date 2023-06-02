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

const app = express();

app.use(express.json());

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
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

