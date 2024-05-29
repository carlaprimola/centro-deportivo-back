import Order from '../models/orders.model.js';
import multer from 'multer';
import User from '../models/user.model.js';
//import Product from '../models/product.model.js';
import multer from 'multer'; //para adjuntar archivos

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const fileExtension = file.originalname.split('.').pop(); // Obtener la extensión del archivo
        const fileName = `${uniqueSuffix}.${fileExtension}`; // Generar un nombre único con la extensión original
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage }).single('document');

// POST CREATE ORDER
const OrderController = {
    addOrder: async (req, res) => {
        try {
            await upload.single('document')(req, res, async (err) => {
                if (err) {
                    console.error('Error al cargar el archivo:', err);
                    return res.status(500).json({ message: 'Error al cargar el archivo' });
                }

            const { user_id, product_ids, summary, status, document } = req.body;            
            
            console.log(`PARENT ID DEL req.params ANTES DE IR A MONGO TIENE VALOR DE: ${req.body}`);
            const orderData = {
                user_id: req.user,
                product_ids,
                summary,
                status,
                document: {
                    data: req.file ? req.file.buffer : null,
                    contentType: req.file ? req.file.mimetype : null
                }
            };
            console.log('Order Data:', orderData);
            const order = new Order(orderData);
            await order.save();
            await User.findByIdAndUpdate(req.user, {
                $push: { "orders_id": order._id }
            });
            console.log('Leelo', order._id);

            res.status(201).json(order);
        })
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
            const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
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