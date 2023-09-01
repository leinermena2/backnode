const mysqlConnection = require('../db');
const Roles = {
  create: (role, callback) => {
    mysqlConnection.query('INSERT INTO roles SET ?', role, callback);
  },
  findAll: (callback) => {
    mysqlConnection.query('SELECT * FROM roles', callback);
  }
};

module.exports = Roles;
