import Order from "../models/orders.model.js";
import User from "../models/user.model.js";

export const getMyOrders = async (req, res) => {
    try {
        // Obtener el ID del usuario autenticado
        const userId = req.user._id;
        console.log(`ID del usuario autenticado: ${userId}`);

        // Consultar los pedidos realizados por el usuario autenticado
        const usersOrders = await Order.find({ user_id: userId }).populate('user_id', 'name lastname');
        res.status(200).json(usersOrders);
    } catch (error) {
        console.error(`Error en getMyOrders: ${error.message}`);
        res.status(500).json({ message: "Error al obtener los pedidos" });
    }
};
