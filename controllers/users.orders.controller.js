import Order from "../models/orders.model.js";
import User from "../models/user.model.js";

export const getMyOrders = async (req, res) => {
    try {
        // Obtener el usuario autenticado
        const user = await User.findById(req.user._id);
       const userOrders = await Order.find({ user_id: req.user._id }).populate('user_id', 'name lastname');
        res.status(200).json(userOrders);
    } catch (error) {
       res.status(500).json({ message: "Error al obtener los pedidos" });
    }
};