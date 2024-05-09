const jwt = require('jsonwebtoken');
const Log = require('./log');

const verifytoken = (req, res, next) => {
  const token = req.headers.authorization;
 console.log(token);
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, 'abc'); // Change the secret to your JWT secret
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifytoken;
