import Order from "../models/orders.model.js";
import User from "../models/user.model.js";

export const getMyOrders = async (req, res) => {
    try {
        // Obtener el usuario autenticado
        const user = await User.findById(req.user._id);

        // Consultar las órdenes del usuario autenticado
// Obtener las órdenes del usuario autenticado y poblar el campo 'user_id' con los datos de usuario (nombre y apellido)
const userOrders = await Order.find({ user_id: req.user._id }).populate('user_id', 'name lastname');
        res.status(200).json(userOrders);
    } catch (error) {
        console.error(`Error en getMyOrders: ${error.message}`);
        res.status(500).json({ message: "Error al obtener los pedidos" });
    }
};