// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'soldandshare',
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ', error);
  } else {
    console.log('Conexión exitosa a la base de datos.');
  }
});

module.exports = connection;
