// utils/sendEmail.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // o el servicio que utilices
  auth: {
    user: 'testcdlaf5@gmail.com',
    pass: 'uzmn mrqi ojhg zaxk',
  },
});

export const sendEmail = async (payment) => {
  const mailOptions = {
    from: 'testcdlaf5@gmail.com',
    to: 'carlaprimola91@gmail.com',
    subject: 'Nuevo pago recibido',
    text: `Se ha recibido un nuevo pago: ${JSON.stringify(payment)}`,
  };

  await transporter.sendMail(mailOptions);
};

export const emailNewPlayerNotification = async (player) => {
  const mailOptions = {
    from: 'testcdlaf5@gmail.com',
    to: 'carlaprimola91@gmail.com',
    subject: 'Nueva Solictud de Jugador',
    text: `Se ha creado un nuevo jugador: \n\nNombre: ${player.name}\nApellidos: ${player.lastname}\nFecha de Nacimiento: ${player.birthdate}\nEmail: ${player.email}\nTeléfono: ${player.phone}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado al administrador');
  } catch (error) {
    console.error('Error enviando el correo:', error);
  }
};
