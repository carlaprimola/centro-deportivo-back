import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getPlayersCtrl, getPlayerByIdCtrl, createPlayerCtrl, deletePlayerByIdCtrl, updatePlayerByIdCtrl  } from "../controllers/player.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPlayerSchema } from "../schemas/player.schema.js";


const router = Router();

router.get('/players',  getPlayersCtrl);
router.get('/players/:id', getPlayerByIdCtrl);
// router.post('/add-player', authRequired, validateSchema(createTaskSchema), createTask);
router.post('/add-player', authRequired, validateSchema(createPlayerSchema), createPlayerCtrl);
router.delete('/players/:id', authRequired, deletePlayerByIdCtrl);
router.put('/players/:id', updatePlayerByIdCtrl);

export default router;