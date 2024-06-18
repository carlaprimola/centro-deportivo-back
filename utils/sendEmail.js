import nodemailer from "nodemailer";
import Product from "../models/product.model.js";
import Order from "../models/orders.model.js";
import User from "../models/user.model.js"


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


export const sendNewOrderEmail = async (order) => {
  try {
    // Crear las filas de productos
    const productRows = order.product_ids.map((product, index) => {
      return `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">${product.name}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${order.selectedSize[index]}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${product.price}€</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${order.resume.quantity[index]}</td>
        </tr>
      `;
    }).join('');

    // Crear la configuración del correo
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
              <td style="padding: 10px; border: 1px solid #ddd;">${order.user_id.name} ${order.user_id.lastname}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Email del Cliente</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${order.user_id.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Fecha del Pedido</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Total del Pedido</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${order.resume.total}€</td>
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
              <th style="padding: 10px; background-color: #F2E205; border: 1px solid #ddd;">Cantidad</th>
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

    await transporter.sendMail(mailOptions);
    console.log("Email enviado correctamente");
  } catch (error) {
    console.error("Error al enviar el email:", error);
  }
};
