
const mysqlConnection = require('../db');
const List = {
  create: (role, callback) => {
    mysqlConnection.query('INSERT INTO list SET ?', role, callback);
  },
  findAll: (callback) => {
    mysqlConnection.query('SELECT * FROM list', callback);
  },
  findByTypeList: (typeList,callback) => {
    mysqlConnection.query('SELECT * FROM list WHERE type_list_id = ?', [typeList], callback);
  },
  findByPartner: (partner,callback) => {
    mysqlConnection.query('SELECT * FROM list WHERE partner = ?', [partner], callback);
  },
  findByTypesList: (typesList,callback) => {
    mysqlConnection.query('SELECT * FROM list WHERE type_list_id in (?)', [typesList], callback);
  }
 
};

module.exports = List;
