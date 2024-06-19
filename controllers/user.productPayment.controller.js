import productPayment from "../models/productPayment.model.js";
import User from "../models/user.model.js";

export const addPayment = async (req, res) => {
  try {
    const { user_id, sumary, orders_id } = req.body;
    const orders = await User.findById(req.user)
    const orderPay = orders.orders_id
     const paymentData = {
      user_id: req.user,
      sumary,
      order_id: orders.orders_id,
      product_payment: {
        status: false,
        document: ""
      }
    };
     const payment = new productPayment(paymentData);
    await payment.save();
    res.status(201).json(payment);
    await User.findByIdAndUpdate(req.user, {
      $push: { "payments_id": payment._id }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};