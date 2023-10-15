// index.js
const express = require('express');
const cors = require('cors');
const mysqlConnection = require('./db');

const app = express();
app.use(express.json());
const port = 4001;


app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  optionsSuccessStatus: 200 
}));


//importacion de controladores
const rolesController = require('./controllers/getRolesController');
const userController = require('./controllers/userController');
const listController = require('./controllers/listController')
const clientsController = require('./controllers/clientsController')
const progressHistoryController = require('./controllers/progressHistoryController');
const MailController = require('./controllers/MailController');


//ruta para obtener roles
app.get('/api/roles', rolesController.getAll);

//creacion de usuarios 
app.post('/api/createUsers', userController.create);

//Inicio de sesion
app.post('/api/loginUser', userController.loginUser);



//LISTAS
//Get listas apartir de tipo de lista
app.get('/api/getListByTypeList/:typeList', listController.getByTypeList);
//Get lista apartir del partner
app.get('/api/getListByPartner/:partner', listController.getByPartner);
//Obtener todas las listas apartir de varios tipos de lista
app.post('/api/getAllListByTypes/', listController.getAllByTypes);


//CLIENTES
//Save Clients
app.post('/api/saveNewClient', clientsController.createClient)
//show all clients 
app.get('/api/clientsView', clientsController.getAllClients)
// agregar infomracion al historial de progreso
app.post('/api/saveNewProgressHistory', progressHistoryController.createProgressHistory)
// Visualizar historial proceso cliente
app.get('/api/getProcessByClient/:id', progressHistoryController.getProgressHistoryByClient)


//MAILS
app.post('/api/sendRequestCode', MailController.sendRequestCode)
app.post('/api/sendResponseCredit', MailController.sendResponseCredit)
app.post('/api/sendMessage', MailController.sendMessage)


//Prueba de insercion de datos
// app.get('api/insertCities', listController.shape);
app.get('/api/insertCities', listController.shape);

// Ruta para obtener todos los registros de la tabla
app.get('/api/registros', (req, res) => {
  const query = 'SELECT * FROM prueba';
  mysqlConnection.query(query, (error, rows) => {
    if (error) {
      console.error('Error al realizar la consulta: ', error);
      res.status(500).json({ error: 'Error al obtener los registros.'+JSON.stringify(error) });
    } else {
      res.json(rows);
    }
  });
});


// Ruta para obtener todos los datos de la tabla roles
// app.get('/api/roles', (req, res) => {
//   const query = 'SELECT * FROM roles';
//   mysqlConnection.query(query, (error, rows) => {
//     if (error) {
//       console.error('Error al realizar la consulta: ', error);
//       res.status(500).json({ error: 'Error al obtener los registros.' });
//     } else {
//       res.json(rows);
//     }
//   });
// });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
