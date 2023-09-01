const List = require('../models/list');
const db = require('../db');
const axios = require('axios');

const url = 'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json';



const listController = {
  getAll(req, res) {
    List.getAll((error, results) => {
      if (error) {
        console.error('Error retrieving lists:', error);
        res.status(500).json({ error: 'Error retrieving lists' });
      } else {
        res.json(results);
      }
    });
  },

  getByTypeList(req, res) {
    const typeList = req.params.typeList;
    List.findByTypeList(typeList, (err, results) => {
        if (err) {
          console.error('Error al obtener la lista:', err);
          return res.status(500).json({ error: 'Error al obtener la lista' });
        }
        res.json(results);
      });
  },

  getByPartner(req, res) {
    const partner = req.params.partner;
    List.findByPartner(partner, (err, results) => {
        if (err) {
          console.error('Error al obtener la lista:', err);
          return res.status(500).json({ error: 'Error al obtener la lista' });
        }
        res.json(results);
      });
  },

  create(req, res) {
    const { type_list_id, item_list, partner, description } = req.body;
    List.create(type_list_id, item_list, partner, description, (error, result) => {
      if (error) {
        console.error('Error creating list:', error);
        res.status(500).json({ error: 'Error creating list' });
      } else {
        res.status(201).json({ message: 'List created successfully', result });
      }
    });
  },

  shape(req, res) {
    axios.get(url)
      .then(response => {
        const jsonData = response.data;
        const processedData = jsonData.map(item => {
            
         
            const query = 'INSERT INTO list (type_list_id, item_list, partner, description) VALUES (?, ?, ?, ?)';
                db.query(query, [8, item.departamento, null, "Departamentos Colombianos"], (error, result) => {
                if (error) {

                    console.log("este es el id",error)
                } else {
                    let idInsert = result.insertId;
                    let citys = item.ciudades;
                    citys.map(ciudadesC => { 
                        const query = 'INSERT INTO list (type_list_id, item_list, partner, description) VALUES (?, ?, ?, ?)';
                        db.query(query, [9, ciudadesC, idInsert, "Esta ciudad pertenece al Departamento "+item.departamento], (error, result) => {
                        if (error) {
        
                        } else {
                            
                        }
                    })
                    })
           
                }
                })
          return { item  };
        });

        res.status(200).json({ data: processedData });
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
        res.status(500).json({ error: 'Error fetching JSON' });
      });
  },

};

module.exports = listController;
