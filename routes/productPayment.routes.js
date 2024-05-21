import { Router } from "express";
import {createPayment, getAllPayments, getPaymentById, updatePayment, uploadPaymentDocument, deletePayment} from "../controllers/productPayment.controller.js";

const router = Router();

router.post('/ckali/', createPayment); 
router.get('/ckali/', getAllPayments); 
router.get('/ckali/:id', getPaymentById); 
router.put('/ckali/:id', updatePayment); 
router.delete('/ckali/:id', deletePayment); 
router.post('/ckali/:id/upload', uploadPaymentDocument);

export default router;