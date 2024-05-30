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

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de pago enviado exitosamente');
  } catch (error) {
    console.error('Error enviando el correo de pago:', error);
  }
};

export const emailNewPlayerNotification = async (player, user) => {
  const mailOptions = {
    from: 'testcdlaf5@gmail.com',
    to: 'leamontoyamua@gmail.com',
    subject: '¡Nueva solicitud de Nuevo Jugador ⚽!',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">Nuevo Jugador</h2>
        <p style="color: #333;">Se ha recibido una nueva solicitud de un nuevo jugador que quiere pertenecer al club. Los detalles son los siguientes:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Nombre del Jugador</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${player.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Apellidos del Jugador</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${player.lastname}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Fecha de Nacimiento</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${player.birthdate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">ID del Jugador</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${player._id}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Nombre del Padre/Responsable</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${user.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">DNI del Padre/Responsable</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${player.dni}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">ID del Padre/Responsable</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${player.parent_id}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Email del Padre/Responsable</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${player.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Teléfono</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${player.phone}</td>
          </tr>
          ${
            player.status
              ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Estado de jugador</td>
              <td style="padding: 10px; border: 1px solid #ddd;">Estado: ${player.status}</td>
            </tr>
          `
              : ''
          }
        </table>
        <div style="text-align: center; padding: 10px; border-radius: 4px;">
          <a href="https://www.tusitio.com" style="text-decoration: none;">
            <button style="background-color: #F2E205; color: #0D0D0D; padding: 10px 20px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
              Ir a mi panel de control
            </button>
          </a>
        </div>
        <div style="text-align: center; margin-top: 10px;">
          <p style="color: #777;">¡Recuerda gestionar tus solicitudes desde tu dashboard!</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado al administrador');
  } catch (error) {
    console.error('Error enviando el correo:', error);
  }
};
