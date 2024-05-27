import mongoose from "mongoose";
import MembershipPayment from "../models/memberPayment.model.js";
import User from "../models/user.model.js";
import Player from "../models/player.model.js";
import { sendEmail } from '../utils/sendEmail.js';
// import { sendWhatsAppMessage } from '../utils/sendWhatsAppMessage.js';

// Obtener todos los pagos
export const getAllMembershipPayments = async (req, res) => {
  try {
    const payments = await MembershipPayment.find();

    if (payments.length === 0) {
      return res.status(200).json({ message: "Todavía no hay pagos." });
    }

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un pago
export const getSingleMembershipPayment = async (req, res) => {
  const id = req.params.id;

  try {
    const payment = await MembershipPayment.findById(id);

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado." });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status500().json({ error: error.message });
  }
};

export const createMembershipPayment = async (req, res) => {
  try {
    const { first_payment, second_payment, third_payment, players_id, parent_id } = req.body;

    // Verificar si el padre existe en la base de datos
    const parent = await User.findById(parent_id);
    if (!parent) {
      return res.status(404).json({ error: "El padre/responsable no existe" });
    }

    // Verificar si el jugador asociado al padre existe en la base de datos
    const player = await Player.findById(players_id);
    if (!player) {
      return res.status(404).json({ error: 'El jugador asociado al padre/responsable no existe' });
    }

    // Crear un nuevo pago de membresía
    const newMemberPayment = new MembershipPayment({
      players_id: players_id,
      parent_id: parent_id,
      first_payment: first_payment
        ? {
            status: false,
            document: first_payment.document,
          }
        : undefined,
      second_payment: second_payment
        ? {
            status: false,
            document: second_payment.document,
          }
        : undefined,
      third_payment: third_payment
        ? {
            status: false,
            document: third_payment.document,
          }
        : undefined,
    });

    // Guardar el pago de membresía en la base de datos
    await newMemberPayment.save();
      // Enviar notificación al administrador
      await sendEmail(newMemberPayment);
      // await sendWhatsAppMessage(newPayment);

    // OJO PUEDE QUE FALTE EN CREATEPLAYERCTLR Actualiza el usuario correspondiente con el ID del nuevo pago creado
     // Actualiza el usuario correspondiente con el ID del nuevo pago creado
     const updateResult = await User.findByIdAndUpdate(parent_id, {
      $push: { membershipPayments: newMemberPayment._id }
    });

    console.log('RESULTADO DEL UPDATE DE MEMBERSHIP HACIA LA TABLA USER:', updateResult);
    // Después de la actualización, recupera el usuario y verifica
const updatedUser = await User.findById(parent_id).populate('membershipPayments');
console.log('RESULTADO DEL UPDATE DE MEMBERSHIP Populated MembershipPayments:', updatedUser);

    res.status(201).json(newMemberPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un pago
export const updateMembershipPayment = async (req, res) => {
  const {  first_payment, second_payment, third_payment, parent_id } = req.body;

  try {
    const payment = await MembershipPayment.findById(parent_id);

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado." });
    }

    if (first_payment !== undefined) {
      payment.first_payment = first_payment;
    }

    if (second_payment !== undefined) {
      payment.second_payment = second_payment;
    }

    if (third_payment !== undefined) {
      payment.third_payment = third_payment;
    }

    await payment.save();

    res.status(200).json({ message: "Pago actualizado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  const { annual_payment, first_payment, second_payment, third_payment, parent_id } = req.body;
  const paymentID = req.params.id;
  console.log('PAYMENT ID CON VALOR DE: ', paymentID);

  try {
    // Buscar el pago existente por su ID
    const payment = await MembershipPayment.findById(paymentID);

    // Verificar si el pago existe
    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado." });
    }

    // Actualizar los estados de los pagos
    if (annual_payment !== undefined) {
      payment.annual_payment = annual_payment;
    }
    if (first_payment !== undefined) {
      payment.first_payment = first_payment;
    }
    if (second_payment !== undefined) {
      payment.second_payment = second_payment;
    }
    if (third_payment !== undefined) {
      payment.third_payment = third_payment;
    }
    if (parent_id !== undefined) {
      payment.parent_id = parent_id;
    }

    // Guardar los cambios realizados en el pago
    await payment.save();

    // Devolver una respuesta exitosa
    res.status(200).json({ message: "Estado del pago actualizado correctamente." });
  } catch (error) {
    // Si ocurre algún error, devolver un mensaje de error
    res.status(500).json({ error: error.message });
  }
};


// Eliminar un pago
export const deleteMembershipPayment = async (req, res) => {
  const { _id } = req.body;

  try {
    const deletedPayment = await MembershipPayment.findByIdAndDelete(_id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "Pago no encontrado." });
    }

    res.status(200).json({ message: "Pago eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


