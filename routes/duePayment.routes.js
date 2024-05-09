import { Router } from "express";
import { createDuePayment, getAllDuePayments, getSingleDuePayment, updateDuePayment } from "../controllers/duePayment.controller.js";

const router = Router();

router.get('/payment', getSingleDuePayment);
router.get('/payments', getAllDuePayments);
router.get('/payments', createDuePayment);
router.get('/payments', updateDuePayment);