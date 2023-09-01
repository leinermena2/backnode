const TypeList = require('../models/typeList');

const typeListController = {
  getAll(req, res) {
    TypeList.getAll((error, results) => {
      if (error) {
        console.error('Error retrieving type lists:', error);
        res.status(500).json({ error: 'Error retrieving type lists' });
      } else {
        res.json(results);
      }
    });
  },

  create(req, res) {
    const { name_list } = req.body;
    TypeList.create(name_list, (error, result) => {
      if (error) {
        console.error('Error creating type list:', error);
        res.status(500).json({ error: 'Error creating type list' });
      } else {
        res.status(201).json({ message: 'Type list created successfully', result });
      }
    });
  },

  saveNews(req, res) {
    console.log(req.body);
    return {message:"okok"}
  }
};

module.exports = typeListController;
