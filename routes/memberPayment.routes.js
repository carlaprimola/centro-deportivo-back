import { Router } from "express";
import { createMembershipPayment, deleteMembershipPayment, getAllMembershipPayments, getAllPaymentStatus, getMyPaymentStatus, getSingleMembershipPayment, updateMembershipPayment, updatePaymentStatus } from "../controllers/memberPayment.controller.js";
import { isAdmin } from "../controllers/auth.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";

const router = Router();

// Rutas para usuarios

router.get('/payment/:id',  verifyToken,  getSingleMembershipPayment);
router.get('/my-status/',  verifyToken,  getMyPaymentStatus);
router.post('/payment/',  verifyToken, createMembershipPayment);
router.put('/payment/:id',  verifyToken, updateMembershipPayment);
router.delete('/payment/:id',  verifyToken, deleteMembershipPayment);

// Fin de rutas para usuarios

// Rutas para administradores

// router.get('/', verifyToken, isAdmin, getAllMembershipPayments);

router.get('/status/',  verifyToken, isAdmin ,getAllMembershipPayments);

router.put('/status/:id',  verifyToken, isAdmin ,updatePaymentStatus);

// router.delete('/kcali/:id/:paymentType', deleteSinglePayment);

// Fin de rutas para administradores

export default router;