const db = require('../db'); // Reemplaza con la ruta correcta a tu archivo de conexión

class ProgressHistory {
  static getAll(callback) {
    db.query('SELECT * FROM progress_history', (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }

  static getById(id, callback) {
    db.query('SELECT * FROM progress_history WHERE id = ?', [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results[0]);
    });
  }
  
  static getByClient(id, callback) {
    db.query('SELECT * FROM progress_history_view WHERE client_id = ?', [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }

  static create(newProgressHistory, callback) {
    db.query('INSERT INTO progress_history SET ?', newProgressHistory, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.insertId);
    });
  }

  static update(id, updatedProgressHistory, callback) {
    db.query('UPDATE progress_history SET ? WHERE id = ?', [updatedProgressHistory, id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.changedRows);
    });
  }

  static delete(id, callback) {
    db.query('DELETE FROM progress_history WHERE id = ?', [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows);
    });
  }
}

module.exports = ProgressHistory;
