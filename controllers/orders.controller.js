// import Order from '../models/orders.model.js';
// import multer from 'multer';
// //import User from '../models/user.model.js';
// //import Product from '../models/product.model.js';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// // POST ADD ORDER
// const OrderController = {
//     addOrder: async (req, res) => {
//         try {

//             const { user_id, product_ids, summary, status, document } = req.body;

//             console.log(`PARENT ID DEL req.params ANTES DE IR A MONGO TIENE VALOR DE: ${req.body}`);

//             const orderData = {
//                 user_id,
//                 product_ids,
//                 summary,
//                 status,
//                 document: ""
//             };

//             console.log('Order Data:', orderData);

//             const order = new Order(orderData);
//             await order.save();

//             res.status(201).json(order);
//         } catch (error) {
//             console.log('Error:', error);
//             res.status(500).json({ message: error.message });
//         }
//     },

//     // GET ALL ORDERS
//     getAllOrders: async (_req, res) => {
//         try {
//             const orders = await Order.find().populate('user_id').populate('product_ids');
//             res.status(200).json(orders);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     },

//     // GET ORDER BY ID
//     getOrderById: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const order = await Order.findById(id).populate('user_id').populate('product_ids');
//             if (!order) return res.status(404).json({ message: 'Order not found' });
//             res.status(200).json(order);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     },

//     // UPDATE ORDER
//     updateOrder: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
//             if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
//             res.status(200).json(updatedOrder);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     },

//     // DELETE ORDER
//     deleteOrder: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const deletedOrder = await Order.findByIdAndDelete(id);
//             if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
//             res.status(200).json({ message: 'Order deleted successfully' });
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
// }

// export default OrderController;
import Order from '../models/orders.model.js';

const OrderController = {
    // Obtener todas las órdenes
    getAllOrders: async (_req, res) => {
        try {
            console.log("Entrando en OrderController getAllOrders");

            const orders = await Order.find();
            console.log(`OrderController obtiene estos datos del modelo: ${orders}`);

            res.status(200).json(orders);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: "Error al obtener órdenes", error: error.message });
        }
    },

    // Obtener una orden por ID
    getOrderById: async (req, res) => {
        try {
            console.log("Entrando en OrderController getOrderById");

            const { id } = req.params;
            const order = await Order.findById(id);
            
            if (!order) {
                return res.status(404).json({ message: "Orden no encontrada" });
            }

            res.status(200).json(order);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: "Error al obtener la orden", error: error.message });
        }
    },

    // Crear una nueva orden
    addOrder: async (req, res) => {
        try {
            console.log("Entrando en OrderController addOrder");

            const { user_id, product_ids, summary, status, document } = req.body;

            const orderData = {
                user_id,
                product_ids,
                summary,
                status,
                document: document || ""
            };

            console.log('Order Data:', orderData);

            const newOrder = await Order.create(orderData);
            res.status(201).json(newOrder);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: "Error al crear la orden", error: error.message });
        }
    },

    // Actualizar una orden existente
    updateOrder: async (req, res) => {
        try {
            console.log("Entrando en OrderController updateOrder");

            const { id } = req.params;
            const { user_id, product_ids, summary, status, document } = req.body;

            const updatedOrder = await Order.findByIdAndUpdate(
                id,
                { user_id, product_ids, summary, status, document },
                { new: true }
            );

            if (!updatedOrder) {
                return res.status(404).json({ message: "Orden no encontrada" });
            }

            res.status(200).json(updatedOrder);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: "Error al actualizar la orden", error: error.message });
        }
    },

    // Eliminar una orden
    deleteOrder: async (req, res) => {
        try {
            console.log("Entrando en OrderController deleteOrder");

            const { id } = req.params;
            const deletedOrder = await Order.findByIdAndDelete(id);

            if (!deletedOrder) {
                return res.status(404).json({ message: "Orden no encontrada" });
            }

            res.status(200).json({ message: "Orden eliminada correctamente" });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: "Error al eliminar la orden", error: error.message });
        }
    }
};

export default OrderController;
