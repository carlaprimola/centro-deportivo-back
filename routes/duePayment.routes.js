import { Router } from "express";
import { createDuePayment, deleteDuePayment, getAllDuePayments, getSingleDuePayment, updateDuePayment } from "../controllers/duePayment.controller.js";

const router = Router();

router.get('/', getAllDuePayments);
router.get('/payment/:id', getSingleDuePayment);
router.post('/payment', createDuePayment);
router.put('/payment/:id', updateDuePayment);
router.delete('/payment/:id', deleteDuePayment);

export default router;