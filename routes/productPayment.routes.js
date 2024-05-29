import { Router } from "express";
import { createPayment, getAllPayments, getPaymentById, updatePayment, uploadPaymentDocument, deletePayment } from "../controllers/productPayment.controller.js";
import { addPayment } from "../controllers/user.productPayment.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router();

router.post('/ckali/', createPayment);
router.get('/ckali/', getAllPayments);
router.get('/ckali/:id', getPaymentById);
router.put('/ckali/:id', updatePayment);
router.delete('/ckali/:id', deletePayment);
router.post('/ckali/:id/upload', uploadPaymentDocument);
router.post('/userPayment', authRequired, addPayment);

export default router;