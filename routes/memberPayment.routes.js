import { Router } from "express";
import { createMembershipPayment, deleteMembershipPayment, getAllMembershipPayments, getSingleMembershipPayment, updateMembershipPayment } from "../controllers/memberPayment.controller.js";

import { verifyToken } from "../controllers/auth.controller.js";
const router = Router();

router.get('/', verifyToken, getAllMembershipPayments);
router.get('/payment/:id',  verifyToken,  getSingleMembershipPayment);
router.post('/payment/:id',  verifyToken, 
createMembershipPayment);
router.put('/payment/:id',  verifyToken, updateMembershipPayment);
router.delete('/payment/:id',  verifyToken, deleteMembershipPayment);
// router.delete('/kcali/:id/:paymentType', deleteSinglePayment);

export default router;