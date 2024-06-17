import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getMyOrders } from '../controllers/users.orders.controller.js';
// import {getMyPDF} from '../controllers/orders.controller.js';
import OrderController from '../controllers/orders.controller.js';
import { isAdmin, verifyToken } from '../controllers/auth.controller.js';
import { upload } from '../controllers/orders.controller.js';
import rateLimit from "express-rate-limit";

const OrderRouter = Router();

// Limitar la cantidad de intentos de pedidos
const limitAddOrder = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 3, // Max number of entries to try log in
    message: 'Demasiados intentos en poco tiempo, por favor inténtalo más tarde',
});

OrderRouter
    .get('/', verifyToken, isAdmin, OrderController.getAllOrders)
    //.get('/order/:id', verifyToken, authRequired, OrderController.getOrderById)
    .get('/order/:orderId', authRequired, OrderController.getOrderDetails)
    .post('/add-order', limitAddOrder, authRequired, upload, OrderController.addOrder)
    .put('/order/:id/status', verifyToken, isAdmin, OrderController.updateOrder)
    .delete('/order/:id', verifyToken, authRequired, OrderController.deleteOrder)
    .get('/myorders', authRequired, getMyOrders)
    // .get('/uploads/:filename', authRequired, OrderController.getMyPDF)
    // .get('/uploads-pdf', authRequired, OrderController.getMyPDF, (req, res) => {
    //     const filename = req.params.filename;
    //     const fileUrl = `http://localhost:5173.com/uploads/${filename}`;
    //     res.set('Content-Disposition', `attachment; filename="${filename}"`);
    //     res.set('Content-Type', 'application/pdf');
    //     res.send(fileUrl);
    //   });

export default OrderRouter;