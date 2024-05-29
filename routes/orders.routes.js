import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getMyOrders } from '../controllers/users.orders.controller.js';
import OrderController from '../controllers/orders.controller.js';
import { verifyToken } from '../controllers/auth.controller.js';
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
    .get('/', OrderController.getAllOrders)
    .get('/order/:id', OrderController.getOrderById)
    .post('/add-order',upload, OrderController.addOrder)
    .put('/order/:id', OrderController.updateOrder)
    .delete('/order/:id', OrderController.deleteOrder)
    .get('/myorders', verifyToken, authRequired, getMyOrders)

export default OrderRouter;
