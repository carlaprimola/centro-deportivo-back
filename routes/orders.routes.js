import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getMyOrders } from '../controllers/users.orders.controller.js';
import OrderController from '../controllers/orders.controller.js';
import { isAdmin, verifyToken } from '../controllers/auth.controller.js';
import { upload } from '../controllers/orders.controller.js';

const OrderRouter = Router();

OrderRouter
    .get('/', verifyToken, isAdmin, OrderController.getAllOrders)
    .get('/order/:id', verifyToken, authRequired, OrderController.getOrderById)
    .post('/add-order', authRequired, upload, OrderController.addOrder)
    .put('/order/:id', verifyToken, authRequired, OrderController.updateOrder)
    .delete('/order/:id', verifyToken, authRequired, OrderController.deleteOrder)
    .get('/myorders', authRequired, getMyOrders)

export default OrderRouter;