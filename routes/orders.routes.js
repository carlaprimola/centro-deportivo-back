import { Router } from 'express';
// import { authRequired } from '../middlewares/validateToken.js';
// import { getMyOrders } from '../controllers/users.orders.controller.js';
import OrderController from '../controllers/orders.controller.js';
// import { verifyToken } from '../controllers/auth.controller.js';


// const OrderRouter = Router();

// OrderRouter
    // .get('/', OrderController.getAllOrders)
    // .get('/order/:id', OrderController.getOrderById)
    // .post('/add-order', OrderController.addOrder)
    // .put('/order/:id', OrderController.updateOrder)
    // .delete('/order/:id', OrderController.deleteOrder)
    // .get('/myorders', verifyToken, authRequired, getMyOrders)

// export default OrderRouter;
const router = Router();

router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.post('/', OrderController.addOrder);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

export default router;
