const mysqlConnection = require('../db');

const Client = {
  getAll: (callback) => {
    mysqlConnection.query('SELECT * FROM clients', callback);
  },

  create: (newClient, callback) => {
    mysqlConnection.query('INSERT INTO clients SET ?', newClient, callback);
  },

  // Agrega más métodos según tus necesidades (editar, eliminar, buscar, etc.).
};

module.exports = Client;
