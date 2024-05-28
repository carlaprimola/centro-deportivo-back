import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getMyOrders } from '../controllers/users.orders.controller.js';
import OrderController from '../controllers/orders.controller.js';
import { isAdmin, verifyToken } from '../controllers/auth.controller.js';


const OrderRouter = Router();

OrderRouter
    .get('/', verifyToken, isAdmin, OrderController.getAllOrders)
    .get('/order/:id', OrderController.getOrderById)
    .post('/add-order', OrderController.addOrder)
    .put('/order/:id', OrderController.updateOrder)
    .delete('/order/:id', OrderController.deleteOrder)
    .get('/myorders', authRequired, getMyOrders)
    // router.post('/neworder', authRequired, );


export default OrderRouter;