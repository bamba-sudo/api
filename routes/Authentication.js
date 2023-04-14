const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { response } = require('express');
require('dotenv').config();


const secret = process.env.SECRET_KEY; // Replace with a secure secret key

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const validUsername = 'user';
  const validPassword = 'pass';

  const validPassword2 = await bcrypt.hash(validPassword, 10);

  await bcrypt.compare(password, validPassword2, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error while comparing the password" });
    }

    if (!result || username !== validUsername) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });

    return res.status(200).json({ token });
  });
});



// Verify token middleware
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(bearerToken, secret, (err, decoded) => {
      if (err) {
        res.redirect('/');
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.redirect('/');
  }
};

router.get('/verify', (req, res) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(bearerToken, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        res.status(200).json({response: true});
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = {
  router,
  verifyToken
};
