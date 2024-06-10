import MembershipPayment from "../models/memberPayment.model.js";
import User from "../models/user.model.js";
import Player from "../models/player.model.js";
import { sendEmail } from "../utils/sendEmail.js";


import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from "pdfkit";
import fs from "fs";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------- CONTROLADORES PARA Usuarios --------------------

// -_- PDF : OJO falta  SENDEMAIL y VERIFICACIONES
// CREAR PAGO DE MEMBRESÍA CON UN ARCHIVO Y ENVIAR UN CORREO ELECTRÓNICO
export const createMembershipPayment = async (req, res) => {
  console.log("WELCOME TO CREATE MEMBERSHIP PAYMENT :)");
  try {
    // Detalles del archivo subido
    console.log("Archivo subido:", req.file);

    // Obtener y validar los campos requeridos del cuerpo de la solicitud
    const { playerId, parentId, paymentType } = req.body;

    if (!playerId || !parentId || !paymentType) {
      return res.status(400).json({ error: "Faltan campos requeridos: playerId, parentId o paymentType" });
    }

    // Crear el objeto de documento basado en el archivo subido
    const document = {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    };

    try {
      // Crear el nuevo registro de pago de membresía
      const paymentData = {
        players_id: playerId, // Asegúrate de enviar el playerId en el cuerpo de la solicitud
        parent_id: parentId,  // Asegúrate de enviar el parentId en el cuerpo de la solicitud
      };

      paymentData[`${paymentType}_payment`] = {
        status: 'pendiente', // Puedes ajustar este valor según tus necesidades
        document: document,
        contentType: req.file.mimetype,
      };

      const membershipPayment = new MembershipPayment(paymentData);
    
  

      // Guarda el registro en la base de datos
      await membershipPayment.save();

       // Actualizar el documento del usuario (padre)
  await User.findByIdAndUpdate(
    parentId,
    { $push: { membership_payments: membershipPayment._id } }, // Suponiendo que tienes un campo 'payments' que es un array en el modelo User
    { new: true, useFindAndModify: false }
  );

  // Actualizar el documento del jugador
  await Player.findByIdAndUpdate(
    playerId,
    { $push: { membership_payments: membershipPayment._id } }, // Suponiendo que tienes un campo 'payments' que es un array en el modelo Player
    { new: true, useFindAndModify: false }
  );

      res.status(201).json({ message: "Pago de membresía creado exitosamente", membershipPayment });
    } catch (saveError) {
      console.error("Error al guardar el pago de membresía:", saveError);
      res.status(500).json({ error: "Error al guardar el pago de membresía" });
    }
  } catch (error) {
    console.error("Error al crear el pago de membresía:", error);
    res.status(500).json({ error: "Error al crear el pago de membresía" });
  }
};


// Obtener el status de mis pagos (ES MEJOR GETMYPAYMENTS?¿?)
export const getMyPaymentStatus = async (req, res) => {
  // Obtener el ID del usuario autenticado
  const parentId = req.user._id;
  console.log(`PARENT ID EN WORKING: ${parentId}`);
  try {
    // Obtener los pagos asociados al ID del usuario
    const payments = await MembershipPayment.find({ parent_id: parentId });

    if (payments.length === 0) {
      return res.status(200).json({ message: "Todavía no hay pagos." });
    }

    // Mapear los pagos para obtener solo los estados de cada tipo de pago
    const paymentStatus = payments.map(payment => ({
      annual_payment: payment.annual_payment.status || 'none',
      first_payment: payment.first_payment.status || 'none',
      second_payment: payment.second_payment.status || 'none',
      third_payment: payment.third_payment.status || 'none'
    }));

    console.log("PAYMENTS STATUS FILTRADO POR PARENT ID: ", paymentStatus);
    res.status(200).json(paymentStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};










// -------------------- CTRL PARA  Administrador --------------------
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

//  Obtener un pago POR ID (para ver PDF y luego EDITAR STATUS )
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

// Actualizar status de pagos
export const updatePaymentStatus = async (req, res) => {
  const {
    annual_payment,
    first_payment,
    second_payment,
    third_payment,
    parent_id,
  } = req.body;
  const paymentID = req.params.id;
  console.log("PAYMENT ID CON VALOR DE: ", paymentID);

  try {
    // Buscar el pago existente por su ID
    const payment = await MembershipPayment.findById(paymentID);

    // Verificar si el pago existe
    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado." });
    }
    console.log(payment);
    // Actualizar los estados de los pagos
    if (annual_payment !== undefined) {
      payment.annual_payment.status = annual_payment.status;
    }
    if (first_payment !== undefined) {
      payment.first_payment.status = first_payment.status;
    }
    if (second_payment !== undefined) {
      payment.second_payment.status = second_payment.status;
    }
    if (third_payment !== undefined) {
      payment.third_payment.status = third_payment.status;
    }
    if (parent_id !== undefined) {
      payment.parent_id = parent_id;
    }

    // Guardar los cambios realizados en el pago
    await payment.save();

    // Devolver una respuesta exitosa
    res
      .status(200)
      .json({ message: "Estado del pago actualizado correctamente." });
  } catch (error) {
    // Si ocurre algún error, devolver un mensaje de error
    res.status(500).json({ error: error.message });
  }
};










// --------------------------- (BETA)-----------------------------------


// PERMITIR AL USUARIO Eliminar un pago
// export const deleteMembershipPayment = async (req, res) => {
//   const { _id } = req.body;

//   try {
//     const deletedPayment = await MembershipPayment.findByIdAndDelete(_id);

//     if (!deletedPayment) {
//       return res.status(404).json({ message: "Pago no encontrado." });
//     }

//     res.status(200).json({ message: "Pago eliminado exitosamente." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// PERMITIR AL USUARIO Actualizar un pago
// export const updateMembershipPayment = async (req, res) => {
//   const { first_payment, second_payment, third_payment, parent_id } = req.body;

//   try {
//     const payment = await MembershipPayment.findById(parent_id);

//     if (!payment) {
//       return res.status(404).json({ message: "Pago no encontrado." });
//     }

//     if (first_payment !== undefined) {
//       payment.first_payment = first_payment;
//     }

//     if (second_payment !== undefined) {
//       payment.second_payment = second_payment;
//     }

//     if (third_payment !== undefined) {
//       payment.third_payment = third_payment;
//     }

//     await payment.save();

//     res.status(200).json({ message: "Pago actualizado correctamente." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// --------------------------- (BETA)-----------------------------------


