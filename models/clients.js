const mysqlConnection = require('../db');

const Client = {
  getAll: (callback) => {
    mysqlConnection.query('SELECT * FROM clients_with_items', callback);
  },

  create: (newClient, callback) => {
    mysqlConnection.query('INSERT INTO clients SET ?', newClient, callback);
  },

  findByEmail: (email, callback) => {
    mysqlConnection.query('SELECT * FROM clients WHERE email = ?', email, callback);
  },

  // Agrega más métodos según tus necesidades (editar, eliminar, buscar, etc.).
};

module.exports = Client;
