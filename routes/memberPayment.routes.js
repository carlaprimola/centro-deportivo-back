import { Router } from "express";
import { createMembershipPayment, deleteMembershipPayment, getAllMembershipPayments, getAllPaymentStatus, getMyPaymentStatus, getSingleMembershipPayment, updateMembershipPayment, updatePaymentStatus } from "../controllers/memberPayment.controller.js";
import { isAdmin } from "../controllers/auth.controller.js";
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

// Rutas para usuarios

router.get('/payment/:id', authRequired,  getSingleMembershipPayment);
router.get('/my-status/', authRequired,  getMyPaymentStatus);
router.post('/payment/',  authRequired, createMembershipPayment);
router.put('/payment/:id',  authRequired, updateMembershipPayment);
router.delete('/payment/:id',  authRequired, deleteMembershipPayment);

// Fin de rutas para usuarios

// Rutas para administradores OJO FALTA IMPLEMENTAR MIDDLEWARE IS ADMIN 

router.get('/status/',  authRequired ,getAllMembershipPayments);

router.put('/status/:id',  authRequired ,updatePaymentStatus);


// Fin de rutas para administradores

export default router;