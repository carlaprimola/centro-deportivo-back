import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getMyOrders } from '../controllers/users.orders.controller.js';
import OrderController from '../controllers/orders.controller.js';
import { verifyToken } from '../controllers/auth.controller.js';


const OrderRouter = Router();

OrderRouter
    .get('/', verifyToken, authRequired, OrderController.getAllOrders)
    .get('/order/:id', verifyToken, authRequired, OrderController.getOrderById)
    .post('/add-order', verifyToken, authRequired, OrderController.addOrder)
    .put('/order/:id', verifyToken, authRequired, OrderController.updateOrder)
    .delete('/order/:id', verifyToken, authRequired, OrderController.deleteOrder)
    .get('/myorders', verifyToken, authRequired, getMyOrders)

export default OrderRouter;
