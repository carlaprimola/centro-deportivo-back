import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import  { getAllPlayersCtlr, getPlayerByIdCtlr } from "../controllers/players.controller.js";


const router = Router();

// ---OJO --- por verificar con auth.routes.js
router.get("/", getAllPlayersCtlr)


// MI PRUEBA?¿?¿?¿:
router.get("/player/:id", authRequired, getPlayerByIdCtlr)


export default router;
