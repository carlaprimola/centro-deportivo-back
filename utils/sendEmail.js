import nodemailer from "nodemailer";
import Product from "../models/product.model.js";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testcdlaf5@gmail.com",
    pass: "uzmn mrqi ojhg zaxk",
  },
});

export const sendNewMembershipEmail = async ({ playerName, parentName, status, filename }) => {
  const mailOptions = {
    from: "testcdlaf5@gmail.com",
    to: "abelardoacostacracco@gmail.com",
    subject: "¡Nuevo pago de membresía recibido!, recuerda verificarlo en tu dashboard.",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">Nuevo Pago Recibido</h2>
        <p style="color: #333;">Se ha recibido un nuevo pago con los siguientes detalles:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <th style="text-align: left; padding: 10px; background-color: #F2E205; color: #0D0D0D; border: 1px solid #ddd;">Campo</th>
            <th style="text-align: left; padding: 10px; background-color: #F2E205; color: #0D0D0D; border: 1px solid #ddd;">Valor</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Nombre del Jugador</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${playerName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Nombre del Padre/Responsable</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${parentName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Estado del Pago</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${status}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Nombre del Archivo</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${filename}</td>
          </tr>
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

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de pago enviado exitosamente');
  } catch (error) {
    console.error('Error enviando el correo de pago:', error);
  }
};


export const emailNewPlayerNotification = async (player, user) => {
  const mailOptions = {
    from: "testcdlaf5@gmail.com",
    to: "leamontoyamua@gmail.com",
    subject: "¡Nueva solicitud de Jugador ⚽!",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">Nuevo Jugador</h2>
        <p style="color: #333;">Se ha recibido una nueva solicitud de un nuevo jugador que quiere pertenecer al club. Los detalles son los siguientes:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Nombre del Jugador</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${player.name} ${
      player.lastname
    }</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Nombre del Padre/Responsable</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${user.name} ${
      user.lastname
    }</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Email del Padre/Responsable</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              player.email
            }</td>
          </tr>
          
          ${
            player.status
              ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Estado de jugador</td>
              <td style="padding: 10px; border: 1px solid #ddd;">Estado: ${player.status}</td>
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
          <p style="color: #777;">¡Recuerda gestionar tus solicitudes desde tu dashboard!</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado al administrador");
  } catch (error) {
    console.error("Error enviando el correo:", error);
  }
};


export const sendNewOrderEmail = async (order, user) => {
  // Obtener detalles de los productos
  const productDetails = await Promise.all(
    order.product_ids.map(async (productId) => {
      const product = await Product.findById(productId);
      return {
        name: product.name,
        price: product.price,
        size: order.selectedSize, // Asumiendo que el tamaño está en el pedido y es igual para todos los productos
      };
    })
  );

  // Generar HTML para los detalles de los productos
  const productRows = productDetails
    .map(
      (product) => `
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">${product.name}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${product.size}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${product.price}€</td>
    </tr>
  `
    )
    .join("");

  const mailOptions = {
    from: "testcdlaf5@gmail.com",
    to: "leamontoyamua@gmail.com",
    subject: "¡Nueva solicitud de Pedido 🛒!",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">Nuevo Pedido</h2>
        <p style="color: #333;">Se ha recibido una nueva solicitud de un pedido. Los detalles son los siguientes:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Nombre del Cliente</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${user.name} ${
      user.lastname
    }</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Email del Cliente</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              user.email
            }</td>
          </tr>
          
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Fecha del Pedido</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              order.date
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Total del Pedido</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              order.total
            }€</td>
          </tr>
          ${
            order.status
              ? `
          <tr>
            <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Estado del Pedido</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${order.status}</td>
          </tr>`
              : ""
          }
        </table>
        <h3 style="color: #333;">Detalles de los Productos</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <th style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Nombre</th>
            <th style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Talla</th>
            <th style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Precio</th>
          </tr>
          ${productRows}
        </table>
        <div style="text-align: center; padding: 10px; border-radius: 4px;">
          <a href="https://www.tusitio.com" style="text-decoration: none;">
            <button style="background-color: #F2E205; color: #0D0D0D; padding: 10px 20px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
              Ir a mi panel de control
            </button>
          </a>
        </div>
        <div style="text-align: center; margin-top: 10px;">
          <p style="color: #777;">¡Recuerda gestionar tus pedidos desde tu dashboard!</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email enviado correctamente");
  } catch (error) {
    console.error("Error al enviar el email:", error);
  }
};

// ----------------- 2FA (RED TEAM REPORT) -------------------- //
// Función para generar un código de verificación
const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString('hex'); // Genera un código de 6 caracteres hexadecimales
}; 

// Función para enviar el correo de verificación
export const send2FAEmail = async (userEmail) => {
  const verificationCode = generateVerificationCode();

  const mailOptions = {
    from: "testcdlaf5@gmail.com",
    to: userEmail,
    subject: "Tu código de verificación de doble factor",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">Código de Verificación</h2>
        <p style="color: #333;">Tu código de verificación es:</p>
        <p style="font-size: 24px; color: #333;"><strong>${verificationCode}</strong></p>
        <p style="color: #333;">Introduce este código en la aplicación para completar tu autenticación.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de verificación enviado exitosamente");

    // Aquí puedes guardar el código de verificación en la base de datos o en la sesión del usuario
    // para su posterior verificación
    return verificationCode;
  } catch (error) {
    console.error("Error enviando el correo de verificación:", error);
    throw new Error("No se pudo enviar el correo de verificación");
  }
};