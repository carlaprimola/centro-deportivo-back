import Order from '../models/orders.model.js';
import multer from 'multer';
import User from '../models/user.model.js';
// import Product from '../models/product.model.js';


//Funcion para almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single('document');

// POST CREATE ORDER
const OrderController = {
    addOrder: async (req, res) => {
        console.log(req.body);
        console.log(req.file)
        try {
            const { product_ids, selectedSize, summary, status, document } = req.body;

            if (!req.file || !summary || !product_ids || product_ids.length === 0|| !selectedSize) {
                return res.status(400).json({ message: 'Complete los campos requeridos' });
            }

            // Crear un nuevo pedido
            const newOrder = new Order({
                user_id: req.user,
                product_ids,
                selectedSize,
                summary,
                status,
                document: req.file,
                contentType: req.file.mimetype
            });
            
            await newOrder.save();

            res.status(201).json(newOrder);
            console.log(newOrder)
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear el pedido' });
        }
    },

    // GET ALL ORDERS
    getAllOrders: async (_req, res) => {
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
            const order = await Order.findById(id).populate('user_id').populate('products');
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
            const { status } = req.body;

            // Validar el estado recibido
            const validStatuses = ['pendiente', 'completado', 'enviado', 'cancelado'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ message: 'Estado no válido' });
            }

            const updatedOrderStatus = await Order.findByIdAndUpdate(
                id,
                { status },
                { new: true } // Devuelve el documento actualizado
            );

            if (!updatedOrderStatus) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.status(200).json(updatedOrderStatus);
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
export { upload };
export default OrderController;
