import productPayment from "../models/productPayment.model.js";
import User from "../models/user.model.js";

export const addPayment = async (req, res) => {
  try {
    const { user_id, sumary, orders_id } = req.body;

    const orders = await User.findById(req.user)

    const orderPay = orders.orders_id

    console.log(`Orders: ${orderPay}`)
    // console.log(`PARENT ID DEL req.params ANTES DE IR A MONGO TIENE VALOR DE: ${req.body}`);
    const paymentData = {
      user_id: req.user,
      sumary,
      order_id: orders.orders_id,
      product_payment: {
        status: false,
        document: ""
      }
    };
    // console.log("Payment Data:", paymentData);
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