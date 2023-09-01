const db = require('../db');

class TypeList {
  static getAll(callback) {
    const query = 'SELECT * FROM type_list';
    db.query(query, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }

  static create(name_list, callback) {
    const query = 'INSERT INTO type_list (name_list) VALUES (?)';
    db.query(query, [name_list], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }
}

module.exports = TypeList;
