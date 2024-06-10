import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import  { getPlayersCtlr, getPlayerByIdCtlr, updatePlayerCtrl } from "../controllers/players.controller.js";

//import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

// ---OJO --- por verificar con auth.routes.js
router.get("/", getPlayersCtlr)

router.put("/player/:id", updatePlayerCtrl);

// MI PRUEBA:
router.get("/player/:id", authRequired, getPlayerByIdCtlr)


// .delete("/player/:id", deletePlayerCtrl)


export default router;
