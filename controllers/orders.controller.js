import Order from '../models/orders.model.js';
import multer from 'multer';
import User from '../models/user.model.js';
import { sendNewOrderEmail } from '../utils/sendEmail.js'; 
import Product from '../models/product.model.js';


//Funcion para almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single('document');

// POST CREATE ORDER
const OrderController = {
    addOrder: async (req, res) => {       
        try {
            const { product_ids, selectedSize, summary, status,resume, document } = req.body;
            console.log(selectedSize)
            if (!req.file || !summary || !product_ids || product_ids.length === 0|| !selectedSize) {
                return res.status(400).json({ message: 'Complete los campos requeridos' });
            }
            // Parsear resume JSON
            const parsedResume = JSON.parse(resume);

            // Crear un nuevo pedido
            const newOrder = new Order({
                user_id: req.user,
                product_ids,
                selectedSize,
                summary,
                status,
                resume: parsedResume,
                document: req.file,
                contentType: req.file.mimetype
            });
            
            const user = await User.findById(req.user._id);
            if (!user) {
                throw new Error('El usuario no existe!');
            }

            await newOrder.save();
            await sendNewOrderEmail(newOrder, user);

            res.status(201).json(newOrder);
            console.log('Resumen pedido:', newOrder)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al crear el pedido' });
        }
    },

    // GET ALL ORDERS
    getAllOrders: async (_req, res) => {
        try {
            const orders = await Order.find().populate('user_id', 'name lastname')
            .populate('product_ids', 'name');
            
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
   

    //GET ORDER DETAILS
    getOrderDetails : async (req, res) => {
        try {
          const orderId = req.params.orderId;
          const order = await Order.findById(orderId).populate('user_id', 'name lastname email').populate('product_ids', 'name price');
          if (!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
      
          const productInfo = await Product.find({ _id: { $in: order.product_ids } });
          res.json({ order, productInfo });
         
        } catch (error) {
          console.error('Error fetching order details:', error);
          res.status(500).json({ message: 'Server error' });
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
    // GET PDF
    getMyPDF: async (req,res) => {
        console.log("Entrando en PDF")
        console.log(req)
        try {
            const order = await Order.findById(req.user._id).populate('user_id');
            console.log(order) 
   
            res.status(200).json(order);
        } catch (error) {
            console.error(`Error en getMyPDF: ${error.message}`);
            res.status(500).json({ message: "Error al obtener PDF" });
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
    },

    
}
export { upload };
export default OrderController;
