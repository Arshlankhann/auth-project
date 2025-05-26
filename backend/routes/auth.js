const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const JWT_SECRET = 'secret_key';

// ===== SIGNUP ROUTE =====
router.post('/signup', (req, res) => {
  const { name, age, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (name, age, email, password) VALUES (?, ?, ?, ?)';
  const values = [name, age, email, hashedPassword];

  db.query(query, values, (err) => {
    if (err) {
      return res.status(500).send({ error: 'Database error', details: err });
    }
    res.send({ message: 'User registered successfully' });
  });
});

// ===== LOGIN ROUTE =====
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const user = results[0];

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true }).send({ message: 'Login successful' });
  });
});

// ===== PROFILE ROUTE =====
router.get('/profile', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ error: 'Not logged in' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: 'Invalid token' });
    }

    db.query('SELECT id, name, age, email FROM users WHERE id = ?', [decoded.id], (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).send({ error: 'User not found' });
      }

      res.send(results[0]);
    });
  });
});

// ===== LOGOUT ROUTE =====
router.post('/logout', (req, res) => {
  res.clearCookie('token').send({ message: 'Logged out successfully' });
});

module.exports = router;
