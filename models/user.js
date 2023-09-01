// const mysqlConnection = require('../config/config');
const mysqlConnection = require('../db');

const User = {
  create: (user, callback) => {
    mysqlConnection.query('INSERT INTO users SET ?', user, callback);
  },
  findByEmail: (email, callback) => {
    mysqlConnection.query('SELECT * FROM users WHERE email = ?', email, callback);
  }
};

module.exports = User;
