const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwtUtils = require('../utils/jwtUtils');

const register = (req, res) => {
  const { name, last_name, age, email, password, role_id } = req.body;
  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      return res.status(500).json({ message: 'Error al encriptar la contraseña' });
    }
    const user = { name, last_name, age, email, password: hashedPassword, role_id };
    User.create(user, (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error al crear el usuario' });
      }
      const token = jwtUtils.generateToken({ id: result.insertId, role_id });
      res.status(201).json({ message: 'Usuario creado exitosamente', token });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error al buscar el usuario' });
    }
    if (!result || result.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const user = result[0];
    bcrypt.compare(password, user.password, (error, isValid) => {
      if (error) {
        return res.status(500).json({ message: 'Error al comparar las contraseñas' });
      }
      if (!isValid) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      const token = jwtUtils.generateToken({ id: user.id, role_id: user.role_id });
      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    });
  });
};

module.exports = {
  register,
  login
};
