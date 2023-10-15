const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getAll = (req, res) => {
  User.getAll((error, result) => {
    if (error) {
      return res.status(500).json({ message: "Error al obtener los usuarios" });
    }
    res.status(200).json(result);
  });
};

const getById = (req, res) => {
  const userId = req.params.id;
  User.getById(userId, (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Error al obtener el usuario" });
    }
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(result[0]);
  });
};

const create = (req, res) => {
  const { name, last_name, age, email, password, role_id } = req.body;
  const user = { name, last_name, age, email, password, role_id };

  const userReturn = { name, last_name, age, email, role_id };

  User.findByEmail(email, (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error al verificar el correo",
        status: "error" + JSON.stringify(error),
      });
    }

    if (result && result.length > 0) {
      return res.status(403).json({
        message: "El correo que ingresaste ya pertenece a un usuario",
        status: "error",
      });
    }

    User.create(user, (error, createdUser) => {
      if (error) {
        return res.status(500).json({
          message: "Error al crear el usuario",
          status: "error" + JSON.stringify(error),
        });
      }

      const id = createdUser.id; // Obtén el ID del usuario creado
      const userReturn = { name, last_name, age, email, role_id, id };
      const token = jwt.sign({ ...userReturn, id: id }, "secret_key");

      return res.status(201).json({
        message: "Usuario creado exitosamente",
        status: "success",
        token,
        id, // Incluye el ID del usuario en la respuesta
      });
    });
  });
};


const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Error al verificar el correo", status: "error", token: "" });
    }

    if (result === undefined || result.length === 0) {
      return res.status(403).json({ message: "El correo electrónico no está registrado", status: "error", token: "", userId: null });
    } else {
      if (result[0].password === password) {
        const userPayload = {
          id: result[0].id,
          name: result[0].name,
          last_name: result[0].last_name,
          age: result[0].age,
          email: result[0].email,
          role_id: result[0].role_id,
        };

        const token = jwt.sign(userPayload, "secret_key");

        return res.status(201).json({
          message: "Inicio de sesión exitoso",
          status: "success",
          token,
          userId: userPayload.id // Incluye el ID del usuario en la respuesta
        });
      } else {
        return res.status(403).json({
          message: "La contraseña proporcionada no es correcta",
          status: "error",
          token: "",
          userId: null
        });
      }
    }
  });
};


module.exports = {
  getAll,
  getById,
  create,
  loginUser,
};
