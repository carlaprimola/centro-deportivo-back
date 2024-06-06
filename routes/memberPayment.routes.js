import { Router } from "express";
import { createMembershipPayment, deleteMembershipPayment, getAllMembershipPayments, getMyPaymentStatus, getSingleMembershipPayment, updateMembershipPayment, updatePaymentStatus } from "../controllers/memberPayment.controller.js";
import { isAdmin } from "../controllers/auth.controller.js";

import { verifyToken } from "../controllers/auth.controller.js";
import { get } from "mongoose";
const router = Router();

router.get('/', verifyToken, isAdmin, getAllMembershipPayments);

router.get('/payment/:id',  verifyToken,  getSingleMembershipPayment);

router.get('/my-status/',  verifyToken,  getMyPaymentStatus);

router.post('/payment/',  verifyToken, createMembershipPayment);

router.put('/payment/:id',  verifyToken, updateMembershipPayment);


router.delete('/payment/:id',  verifyToken, deleteMembershipPayment);

router.get('/status/',  verifyToken, isAdmin ,getAllMembershipPayments);

router.put('/status/:id',  verifyToken, isAdmin ,updatePaymentStatus);

// router.delete('/kcali/:id/:paymentType', deleteSinglePayment);

export default router;