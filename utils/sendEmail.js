import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testcdlaf5@gmail.com",
    pass: "uzmn mrqi ojhg zaxk",
  },
});

export const sendEmail = async (payment) => {
  try {
    const mailOptions = {
      from: "testcdlaf5@gmail.com",
      to: "abelardoacostacracco@gmail.com",
      subject:
        "¡Nuevo pago de membresía recibido!, recuerda verificarlo en tu dashboard.",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">Nuevo Pago Recibido</h2>
          <p style="color: #333;>Se ha recibido un nuevo pago con los siguientes detalles:</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <th style="text-align: left; padding: 10px; background-color: #F2E205; color: #0D0D0D; border: 1px solid #ddd;">Campo</th>
              <th style="text-align: left; padding: 10px; background-color: #F2E205; color: #0D0D0D; border: 1px solid #ddd;">Valor</th>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">ID del Jugador</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                payment.players_id
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">ID del Padre/Responsable</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                payment.parent_id
              }</td>
            </tr>
            ${
              payment.first_payment
                ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Primer Pago</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Documento: ${payment.first_payment.document}, Estado: ${payment.first_payment.status}</td>
              </tr>
            `
                : ""
            }
            ${
              payment.second_payment
                ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Segundo Pago</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Documento: ${payment.second_payment.document}, Estado: ${payment.second_payment.status}</td>
              </tr>
            `
                : ""
            }
            ${
              payment.third_payment
                ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">Tercer Pago</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Documento: ${payment.third_payment.document}, Estado: ${payment.third_payment.status}</td>
              </tr>
            `
                : ""
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
          <p style="color: #777;">¡Recuerda verificar la validez del pago en tu dashboard!</p>
        </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};
