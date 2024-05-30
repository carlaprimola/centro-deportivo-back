// utils/sendWhatsAppMessage.js
import twilio from 'twilio';

const accountSid = 'tu_account_sid'; // Encuéntralo en el panel de Twilio
const authToken = 'tu_auth_token'; // Encuéntralo en el panel de Twilio
const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (payment) => {
  const message = `Se ha recibido un nuevo pago: ${JSON.stringify(payment)}`;

  await client.messages.create({
    body: message,
    from: 'whatsapp:+14155238886', // El número de WhatsApp sandbox de Twilio
    to: 'whatsapp:+1234567890', // Número de WhatsApp del administrador
  });
};
