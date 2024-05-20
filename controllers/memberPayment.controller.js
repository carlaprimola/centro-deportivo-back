import MembershipPayment from "../models/memberPayment.model.js";

// GETS ALL PAYMENTS
export const getAllMembershipPayments = async (req, res) => {
  try {
    const payments = await MembershipPayment.find();

    if (payments.length === 0) {
      return res.status(200).json({ message: 'Todavía no hay pagos.' });
    }

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GETS A PAYMENT
export const getSingleMembershipPayment = async (req, res) => {
  const id = req.params.id;

  try {
    const payment = await MembershipPayment.findById(id);

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado." });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// CREATES A PAYMENT
export const createMembershipPayment = async (req, res) => {
  const { player_id, first_payment, second_payment, third_payment } = req.body; 

  try {
    const newMemberPayment = new MembershipPayment({
      player_id,
      first_payment: first_payment ? {
        status: first_payment.status,
        document: first_payment.document
      } : undefined,
      second_payment: second_payment ? {
        status: second_payment.status,
        document: second_payment.document
      } : undefined,
      third_payment: third_payment ? {
        status: third_payment.status,
        document: third_payment.document
      } : undefined,
    });

    await newMemberPayment.save();

    res.status(201).json(newMemberPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATES A PAYMENT
export const updateMembershipPayment = async (req, res) => {
  const id = req.params.id;
  const { status, first_payment, second_payment, third_payment } = req.body;

  try {
    const payment = await MembershipPayment.findById(id);

    if (!payment) {
      return res.status(404).json({ message: 'Pago no encontrado.' });
    }

    // Actualizar el estado del pago
    if (status !== undefined) {
      payment.status = status; 
    }

    // Actualizar el primer pago
    if (first_payment !== undefined) {
      payment.first_payment = first_payment;
    }

    // Actualizar el segundo pago
    if (second_payment !== undefined) {
      payment.second_payment = second_payment;
    }

    // Actualizar el tercer pago
    if (third_payment !== undefined) {
      payment.third_payment = third_payment;
    }

    await payment.save();

    res.status(200).json({ message: 'Pago actualizado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE A PAYMENT
export const deleteMembershipPayment = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedPayment = await MembershipPayment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: 'Pago no encontrado.' });
    }

    res.status(200).json({ message: 'Pago eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE A SINGLE PAYMENT
// DELETE A SINGLE PAYMENT
export const deleteSinglePayment = async (req, res) => {
  const { id, paymentType } = req.params;

  try {
    const payment = await MembershipPayment.findById(id);

    if (!payment) {
      return res.status(404).json({ message: 'Pago no encontrado.' });
    }

    if (!['first_payment', 'second_payment', 'third_payment'].includes(paymentType)) {
      return res.status(400).json({ message: 'Tipo de pago no válido.' });
    }

    payment[paymentType] = undefined;

    await payment.save();

    res.status(200).json({ message: `${paymentType} eliminado exitosamente.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

