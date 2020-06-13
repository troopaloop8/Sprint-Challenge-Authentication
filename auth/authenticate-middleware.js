const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({message: "Invalid credentials"})
      } else {
        next();
      }
    })
  } else {
    res.status(401).json({message: "You shall not pass"})
  }
};