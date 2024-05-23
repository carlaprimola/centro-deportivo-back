import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createPlayer, getMyPlayers } from "../controllers/user.controller.js";
//import { validateSchema } from "../middlewares/validator.middleware.js";
//import { createTaskSchema } from "../schemas/task.schema.js";


const router = Router();
// router.get('/', getAllPlayers)
// router.get('/players', getMyPlayers); //ver mis jugadores
// router.post('/players', createPlayer);//crear un jugador nuevo


//RUTAS PARA EL USUARIO 
router.get('/myplayers', verifyToken, authRequired, getMyPlayers);


//RUTAS ADMINISTRADOR
router.get('/user', verifyToken, isAdmin, getUsers); //muestra todos los usuarios ,
router.patch('/user/:id',verifyToken, authRequired, updateUser); //actualiza un usuario
router.delete('/user/:id', verifyToken, authRequired, deleteUser); //elimina un usuario
router.post('/players', verifyToken, isAdmin, createPlayer); //muestra todos los jugadores

export default router;