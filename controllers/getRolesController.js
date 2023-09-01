const Roles = require('../models/roles');

const getAll = (req, res) => {
  Roles.findAll((error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error al obtener los roles' });
    }
    res.status(200).json(result);
  });
};


module.exports = {
  getAll
};
