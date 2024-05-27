// utils/sendEmail.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // o el servicio que utilices
  auth: {
    user: 'testcdlaf5@gmail.com',
    pass: 'uzmn mrqi ojhg zaxk',
  }, //NECESITAMOS AGREGAR VARIABLE DE ENTORNO AQUÍ
});

export const sendEmail = async (payment) => {
  const mailOptions = {
    from: 'testcdlaf5@gmail.com',
    to: 'abelardoacostacracco@gmail.com',
    subject: 'Nuevo pago recibido',
    text: `Se ha recibido un nuevo pago: ${JSON.stringify(payment)}`,
  };

  await transporter.sendMail(mailOptions);
};
