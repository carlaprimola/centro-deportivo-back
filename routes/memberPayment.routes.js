import { Router } from "express";
import { createMembershipPayment, deleteMembershipPayment, deleteSinglePayment, getAllMembershipPayments, getSingleMembershipPayment, updateMembershipPayment } from "../controllers/memberPayment.controller.js";

const router = Router();

router.get('/', getAllMembershipPayments);
router.get('/kcali/:id', getSingleMembershipPayment);
router.post('/kcali', createMembershipPayment);
router.put('/kcali/:id', updateMembershipPayment);
router.delete('/kcali/:id', deleteMembershipPayment);
router.delete('/kcali/:id/:paymentType', deleteSinglePayment);

export default router;