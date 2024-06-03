import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getMyOrders } from '../controllers/users.orders.controller.js';
import OrderController from '../controllers/orders.controller.js';
import { isAdmin, verifyToken } from '../controllers/auth.controller.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single('document');

const OrderRouter = Router();

OrderRouter
    .get('/', verifyToken, isAdmin, OrderController.getAllOrders)
    .get('/order/:id', verifyToken, authRequired, OrderController.getOrderById)
    .post('/add-order', authRequired, OrderController.addOrder)
    .put('/orders/:id', verifyToken, authRequired, OrderController.updateOrder)
    .delete('/order/:id', verifyToken, authRequired, OrderController.deleteOrder)
    .get('/myorders', authRequired, getMyOrders)

export default OrderRouter;