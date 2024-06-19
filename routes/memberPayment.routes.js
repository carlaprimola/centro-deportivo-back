import { Router } from "express";
import { createMembershipPayment, getAllMembershipPayments, getMyPaymentStatus, getSingleMembershipPayment,  updatePaymentStatus } from "../controllers/memberPayment.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { authRequired } from '../middlewares/validateToken.js';
import { upload } from '../middlewares/upload.middleware.js';
const router = Router();


router.get('/my-payments/', authRequired,  getMyPaymentStatus);

router.post('/pay', upload,  createMembershipPayment); 











// router.delete('/payment/:id',  authRequired, deleteMembershipPayment);

// ---------- Fin de rutas para usuarios ---------- //


// ---------- Rutas para administradores OJO FALTA MIDDLEWARE IS ADMIN ---------- //

router.get('/payment/:id', authRequired,  getSingleMembershipPayment);
router.get('/status/',  authRequired,  getAllMembershipPayments);
router.put('/status/:id',  authRequired,  updatePaymentStatus);

// -------- (PDF) RUTAS DE TRABAJO ACTUAL 
//  PARA LEER UN PAGO DE MEMBRESÍA




// ---------- Fin de rutas para administradores ---------- //

export default router;