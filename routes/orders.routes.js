import { Router } from 'express';
import OrderController from '../controllers/orders.controller.js';

const OrderRouter = Router();

OrderRouter
    .get('/', OrderController.getAllOrders)
    .get('/order/:id', OrderController.getOrderById)
    .post('/add-order', OrderController.addOrder)
    .put('/order/:id', OrderController.updateOrder)
    .delete('/order/:id', OrderController.deleteOrder)

export default OrderRouter;
