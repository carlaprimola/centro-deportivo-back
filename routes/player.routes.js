import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import  { getAllPlayersCtlr, getPlayerByIdCtlr } from "../controllers/players.controller.js";


const router = Router();

router.get("/", getAllPlayersCtlr)
router.get("/player/:id", authRequired, getPlayerByIdCtlr)


export default router;
