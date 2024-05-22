import Order from '../models/orders.model.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';

// Crear un nuevo pedido
const OrderController = {
    addOrder: async (req, res) => {
        try {
            const { userEmail, productNames, summary, status, document } = req.body;

            const user = await User.findOne({ email: userEmail });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const products = await Product.find({ name: { $in: productNames } });
            if (products.length !== productNames.length) return res.status(404).json({ message: 'Some products not found' });

            const productIds = products.map(product => product._id);

            const orderData = {
                user_id: user._id,
                product_ids: productIds,
                summary,
                status,
                document
            };

            const order = new Order(orderData);
            await order.save();

            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtener todos los pedidos
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find().populate('user_id').populate('product_ids');
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtener un pedido por ID
    getOrderById: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findById(id).populate('user_id').populate('product_ids');
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Actualizar un pedido
    updateOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Eliminar un pedido
    deleteOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedOrder = await Order.findByIdAndDelete(id);
            if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default OrderController;
