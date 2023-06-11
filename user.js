const bcrypt = require('bcryptjs');
const express=require('express')
const mysql = require('mysql2/promise');
const router = express.Router()
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

function verifyAdminRole(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      if (!decoded.role) {
        return res.status(401).send('Unauthorized: Invalid role');
      }

      // If user is admin, add the decoded token to the request and continue to the next middleware
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
  }

router.use(verifyAdminRole);

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Luo12345',
    database: 'cse135'
  });

router.get("/",async (req,res)=>{
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM users');
        res.send(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred when fetching users');
    }
})

router.post("/", async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const [result] = await pool.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
        res.send('User created successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred when creating user');
    }
});

// Update a user
router.put("/:username", async (req, res) => {
    const username = req.params.username;
    const { password, role } = req.body;
    try {
        // Only update password if it's provided and not equal to '0'
        if (password && password !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await pool.execute('UPDATE users SET password = ?, role = ? WHERE username = ?', [hashedPassword, role, username]);
        } else {
            const [result] = await pool.execute('UPDATE users SET role = ? WHERE username = ?', [role, username]);
        }
        res.send('User updated successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred when updating user');
    }
});
router.delete("/:username", async (req, res) => {
    const username = req.params.username;
    try {
        const [result] = await pool.execute('DELETE FROM users WHERE username = ?', [username]);
        res.send('User deleted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred when deleting user');
    }
});
module.exports = router