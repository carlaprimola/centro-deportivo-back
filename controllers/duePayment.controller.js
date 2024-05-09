import membership_payments from "../models/duePayment.model.js";

// GETS ALL DUEPAYMENTS
export const getAllDuePayments = async (req, res) => {
  try {
    const payments = await membership_payments.find();

    if (payments.length === 0) {
      return res.status(200).json({ message: 'Todavía no hay pagos.' });
    }

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GETS A DUEPAYMENT
export const getSingleDuePayment = async (req, res) => {
  const id = req.params.id;

  try {
    const payment = await membership_payments.findById(id);

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado." });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATES A DUEPAYMENT
export const createDuePayment = async (req, res) => {
  const { user_id, voucher_img } = req.body;

  try {
    const newDuePayment = new membership_payments ({
      user_id,
      voucher_img
    });

    await newDuePayment.save();

    res.status(201).json( `creado correctamente ${ newDuePayment }`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATES A DUEPAYMENT
export const updateDuePayment = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  try {
    const duePayment = await membership_payments.findById(id);

    if (!duePayment) {
      return res.status(404).json({ message: 'Pago no encontrado.' });
    }

    duePayment.state = status; 
    await duePayment.save();

    res.status(200).json({ duePayment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE A DUEPAYMENT
export const deleteDuePayment = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedPayment = await membership_payments.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: 'Pago no encontrado.' });
    }

    res.status(200).json({ message: 'Pago eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
