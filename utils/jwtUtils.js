const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    role: user.role
  };
  return jwt.sign(payload, config.secretKey, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  jwt.verify(token, config.secretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  generateToken,
  verifyToken
};
