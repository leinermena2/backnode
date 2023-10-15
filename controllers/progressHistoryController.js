const ProgressHistory = require('../models/progressHistory'); // Reemplaza con la ruta correcta a tu modelo

const progressHistoryController = {
  getAllProgressHistory: (req, res) => {
    ProgressHistory.getAll((error, results) => {
      if (error) {
        console.error('Error al obtener el historial de progreso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.json(results);
      }
    });
  },

  getProgressHistoryById: (req, res) => {
    const id = req.params.id;
    ProgressHistory.getById(id, (error, result) => {
      if (error) {
        console.error('Error al obtener el historial de progreso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.json(result);
      }
    });
  },

  getProgressHistoryByClient: (req, res) => {
    const id = req.params.id;
    ProgressHistory.getByClient(id, (error, result) => {
      if (error) {
        console.error('Error al obtener el historial de progreso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.json(result);
      }
    });
  },

  createProgressHistory: (req, res) => {
    const newProgressHistory = req.body;
    ProgressHistory.create(newProgressHistory, (error, id) => {
      if (error) {
        console.error('Error al crear el historial de progreso:', error);
        res.status(500).json({ error: 'error', message:"Error al crear el registro", status:"error" });
      } else {
        res.status(201).json({ id, message:"Registro agregado correctamente", status:"success" });
      }
    });
  },

  updateProgressHistory: (req, res) => {
    const id = req.params.id;
    const updatedProgressHistory = req.body;
    ProgressHistory.update(id, updatedProgressHistory, (error, affectedRows) => {
      if (error) {
        console.error('Error al actualizar el historial de progreso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (affectedRows > 0) {
          res.json({ message: 'Historial de progreso actualizado correctamente' });
        } else {
          res.status(404).json({ error: 'Historial de progreso no encontrado' });
        }
      }
    });
  },

  deleteProgressHistory: (req, res) => {
    const id = req.params.id;
    ProgressHistory.delete(id, (error, affectedRows) => {
      if (error) {
        console.error('Error al eliminar el historial de progreso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (affectedRows > 0) {
          res.json({ message: 'Historial de progreso eliminado correctamente' });
        } else {
          res.status(404).json({ error: 'Historial de progreso no encontrado' });
        }
      }
    });
  }
};

module.exports = progressHistoryController;
