import Order from '../models/orders.model.js';
import multer from 'multer';
import User from '../models/user.model.js';
//import Product from '../models/product.model.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// POST ADD ORDER
const OrderController = {
    addOrder: async (req, res) => {
        try {
            const { user_id, product_ids, summary, status, document } = req.body;
            console.log(`PARENT ID DEL req.params ANTES DE IR A MONGO TIENE VALOR DE: ${req.body}`);
            const orderData = {
                user_id: req.user,
                product_ids,
                summary,
                status,
                document: ""

            };
            console.log('Order Data:', orderData);
            const order = new Order(orderData);
            await order.save();
            await User.findByIdAndUpdate(req.user, {
                $push: { "orders_id": order._id }
            });
            console.log('Leelo', order._id);

            res.status(201).json(order);
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({ message: error.message });
        }
    },




    // GET ALL ORDERS
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find().populate('user_id').populate('product_ids');
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // GET ORDER BY ID
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

    // UPDATE ORDER
    updateOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedOrder = await Order.findByIdAndUpdate(
                id, 
                { status: req.body.status }, //actual updating 
                { new: true } // Devuelve el documento actualizado
            );
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // DELETE ORDER
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
