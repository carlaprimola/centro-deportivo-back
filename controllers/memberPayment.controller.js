import MembershipPayment from "../models/memberPayment.model.js";
import User from "../models/user.model.js";
import Player from "../models/player.model.js";

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

// Crear un pago
export const createMembershipPayment = async (req, res) => {
  try {
    const { first_payment, second_payment, third_payment, players_id } = req.body;
    console.log(players_id)
    const parentID = req.params.id;
    console.log(`PARENT ID DEL req.params ANTES DE IR A MONGO TIENE VALOR DE: ${parentID}`);

    const parent = await User.findById(parentID);
    console.log(`PARENT ID FILTRADO EN MONGO: ${parent}`);
    if (!parent) {
      return res.status(404).json({ error: "El padre/responsable no existe" });
    }

    

    console.log(`EL ID DE LOS PLAYERS ANTES DE IR A MONGO ES: ${players_id}`);
    // Más información de depuración
    const player = await Player.findById(players_id);
    console.log(`ID PLAYER FILTRANDO EN TABLA DE MONGO TIENE VALOR DE: ${player}`);
    if (!player) {
      return res.status(404).json({ error: 'El jugador asociado al padre/responsable no existe' });
    }

    const newMemberPayment = new MembershipPayment({
      players_id: players_id,
      first_payment: first_payment
        ? {
            status: first_payment.status,
            document: first_payment.document,
          }
        : undefined,
      second_payment: second_payment
        ? {
            status: second_payment.status,
            document: second_payment.document,
          }
        : undefined,
      third_payment: third_payment
        ? {
            status: third_payment.status,
            document: third_payment.document,
          }
        : undefined,
    });

    await newMemberPayment.save();

    res.status(201).json(newMemberPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un pago
export const updateMembershipPayment = async (req, res) => {
  const id = req.params.id;
  const { status, first_payment, second_payment, third_payment } = req.body;

  try {
    const payment = await MembershipPayment.findById(id);

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado." });
    }

    if (status !== undefined) {
      payment.status = status;
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

// Eliminar un pago
export const deleteMembershipPayment = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedPayment = await MembershipPayment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "Pago no encontrado." });
    }

    res.status(200).json({ message: "Pago eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un pago individual
export const deleteSinglePayment = async (req, res) => {
  const { id, paymentType } = req.params;

  try {
    const payment = await MembershipPayment.findById(id);

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado." });
    }

    if (!["first_payment", "second_payment", "third_payment"].includes(paymentType)) {
      return res.status(400).json({ message: "Tipo de pago no válido." });
    }

    payment[paymentType] = undefined;

    await payment.save();

    res.status(200).json({ message: `${paymentType} eliminado exitosamente.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
