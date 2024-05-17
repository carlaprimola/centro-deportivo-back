import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createPlayer, getMyPlayers } from "../controllers/users.players.controller.js";
//import { validateSchema } from "../middlewares/validator.middleware.js";
//import { createTaskSchema } from "../schemas/task.schema.js";


const router = Router();

router.get('/myplayers', authRequired, getMyPlayers); //ver mis jugadores
router.post('/players', authRequired, createPlayer);//crear un jugador nuevo


// router.get('/tasks/:id', authRequired, getTask);
// router.post('/add-task', authRequired, validateSchema(createTaskSchema), createTask);
// router.delete('/tasks/:id', authRequired, deleteTask);
// router.put('/tasks/:id', authRequired, updateTask);

export default router;