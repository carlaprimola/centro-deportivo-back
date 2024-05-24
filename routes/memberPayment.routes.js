import { Router } from "express";
import { createMembershipPayment, deleteMembershipPayment, getAllMembershipPayments, getSingleMembershipPayment, updateMembershipPayment, updatePaymentStatus } from "../controllers/memberPayment.controller.js";
import { isAdmin } from "../controllers/auth.controller.js";

import { verifyToken } from "../controllers/auth.controller.js";
const router = Router();

router.get('/', verifyToken, getAllMembershipPayments);
router.get('/payment/:id',  verifyToken,  getSingleMembershipPayment);
router.post('/payment/',  verifyToken, createMembershipPayment);
router.put('/payment/:id',  verifyToken, updateMembershipPayment);
router.put('/payment/status/:id',  verifyToken, isAdmin ,updatePaymentStatus);
router.delete('/payment/:id',  verifyToken, deleteMembershipPayment);
// router.delete('/kcali/:id/:paymentType', deleteSinglePayment);

export default router;