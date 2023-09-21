const Client = require('../models/clients');

const clientsController = {
    getAllClients: (req, res) => {
      Client.getAll((err, clients) => {
        if (err) {
          console.error('Error al obtener clientes:', err);
          return res.status(500).json({ error: 'Error al obtener clientes' });
        }
        res.json(clients);
      });
    },

  createClient: (req, res) => {
  
    const newClient = {
      name: req.body.name,
      last_name: req.body.last_name,
      age: req.body.age,
      type_document: req.body.type_document,
      document_number: req.body.document_number,
      state_id: req.body.state_id,
      city_id: req.body.city_id,
      email: req.body.email,
      phone: req.body.phone,
      moto_branch: req.body.moto_branch,
      know_us: req.body.know_us,
      date_need_contact: req.body.date_need_contact,
      date_get_contact: req.body.date_get_contact,
      date_creation: new Date(),
      moto_ref_id: req.body.moto_ref_id,
      got_savings: req.body.got_savings,
      savings: req.body.savings,
      born_date: req.body.born_date,
      born_site_id: req.body.born_site_id,
      expedition_document_date: req.body.expedition_document_date,
      site_expedition_id: req.body.site_expedition_id,
      address: req.body.address,
      civil_state_id: req.body.civil_state_id,
      type_home_id: req.body.type_home_id,
      report_id: req.body.report_id,
      education_level_id: req.body.education_level_id,
      status_work_id: req.body.status_work_id,
      deal_type_id: req.body.deal_type_id,
      social_security_id: req.body.social_security_id,
      cargo: req.body.cargo,
      camera_comercial: req.body.camera_comercial,
      month_income: req.body.month_income,
      aditional_income: req.body.aditional_income,
      company_name: req.body.company_name,
      nit_company: req.body.nit_company,
      addres_company: req.body.addres_company,
      company_phone: req.body.company_phone,
      time_working: req.body.time_working,
      personal_referent: req.body.personal_referent,
      family_referent: req.body.family_referent,
      status: req.body.status,
    };

    Client.findByEmail(req.body.email, (error, result) => {
      if (result === undefined || result.length === 0) {
        Client.create(req.body, (error, result) => {
          if (error !== null) {
            return res
              .status(500)
              .json({
                message: "Hubo un error al enviar tus datos",
                status: "error" + JSON.stringify(error),
              });
          }
        
          return res
            .status(201)
            .json({
              message: "Recibiras un correo electronico confirmando que recibimos tu información",
              status: "success",
            });
        });
      } else {
        return res
          .status(403)
          .json({
            message: "El correo que ingresado ya esta registrado",
            status: "error",
          });
      }
    });


    Client.create(newClient, (err, result) => {
      if (err) {
        console.error('Error al crear un cliente:', err);
        return res.status(500).json({ error: 'Error al crear un cliente' });
      }
      res.status(201).json({ message: 'Cliente creado con éxito', id: result.insertId });
    });
  },

  // Mostrar 
};

module.exports = clientsController;
