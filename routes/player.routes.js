import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import  { getAllPlayersCtlr, getPlayerByIdCtlr } from "../controllers/players.controller.js";

//import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

// ---OJO --- por verificar con auth.routes.js
router.get("/", getAllPlayersCtlr)

// router.put("/player/:id", updatePlayerCtlr);




// MI PRUEBA?¿?¿?¿:
router.get("/player/:id", authRequired, getPlayerByIdCtlr)


// .delete("/player/:id", deletePlayerCtlr)


export default router;
