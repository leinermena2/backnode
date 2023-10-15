const nodemailer = require('nodemailer'); // Asegúrate de tener esta línea


const MailController = {
 
    sendRequestCode(req,res){
        const { to, subject, text } = req.body;

        // Configuración del transportador de correo electrónico
        const transporter = nodemailer.createTransport({
          service: 'gmail', // Puedes cambiarlo según tu proveedor de correo
          auth: {
            user: 'mrsketchco@gmail.com', // Tu dirección de correo electrónico
            pass: 'keoa bqpd jtjn jahc', // Tu contraseña de correo electrónico
          },
        });
      
        // Configuración del correo electrónico
        const mailOptions = {
          from: 'no-reply@diverxamotos.com.co', // Tu dirección de correo electrónico
          to: to,
          subject: subject,
          text: text,
        };
      
        // Envía el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el correo electrónico');
          } else {
            res.send({status:200, message:'Correo electrónico enviado correctamente'});
          }
        });   
    },
 
    sendResponseCredit(req,res){
        const { to, subject, text } = req.body;

        // Configuración del transportador de correo electrónico
        const transporter = nodemailer.createTransport({
          service: 'gmail', // Puedes cambiarlo según tu proveedor de correo
          auth: {
            user: 'mrsketchco@gmail.com', // Tu dirección de correo electrónico
            pass: 'keoa bqpd jtjn jahc', // Tu contraseña de correo electrónico
          },
        });
      
        // Configuración del correo electrónico
        const mailOptions = {
          from: 'no-reply@diverxamotos.com.co', // Tu dirección de correo electrónico
          to: to,
          subject: subject,
          text: text,
        };
      
        // Envía el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el correo electrónico');
          } else {
            res.send({status:200, message:'Correo electrónico enviado correctamente'});
          }
        });   
    }
    ,
    sendMessage(req,res){
        const { to, subject, text } = req.body;

        const transporter = nodemailer.createTransport({
          service: 'gmail', 
          auth: {
            user: 'mrsketchco@gmail.com',
            pass: 'keoa bqpd jtjn jahc', 
          },
        });
      
       
        const mailOptions = {
          from: 'no-reply@diverxamotos.com.co',
          to: to,
          subject: subject,
          text: text,
        };
      
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el correo electrónico');
          } else {
            res.send({status:200, message:'Correo electrónico enviado correctamente'});
          }
        });   
    }

};

module.exports = MailController;
