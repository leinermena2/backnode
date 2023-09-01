const Client = require('../models/clients');

const clientsController = {
//   getAllClients: (req, res) => {
//     Client.getAll((err, clients) => {
//       if (err) {
//         console.error('Error al obtener clientes:', err);
//         return res.status(500).json({ error: 'Error al obtener clientes' });
//       }
//       res.json(clients);
//     });
//   },

  createClient: (req, res) => {
    const newClient = {
      name: req.body.name,
      last_name: req.body.last_name,
      age: req.body.age,
      type_document: req.body.type_document,
      document_number: req.body.document_number,
      state: req.body.state,
      city: req.body.city,
      email: req.body.email,
      phone: req.body.phone,
      moto_branch: req.body.moto_branch,
      know_us: req.body.know_us,
      date_need_contact: req.body.date_need_contact,
      date_get_contact: "",
      date_creation: new date(),
    };

    Client.create(newClient, (err, result) => {
      if (err) {
        console.error('Error al crear un cliente:', err);
        return res.status(500).json({ error: 'Error al crear un cliente' });
      }
      res.status(201).json({ message: 'Cliente creado con éxito', id: result.insertId });
    });
  },

  // Agrega más controladores según tus necesidades.
};

module.exports = clientsController;
