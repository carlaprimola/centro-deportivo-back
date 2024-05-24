import { Router } from "express";
import { verifyToken, isAdmin } from "../middlewares/validateToken.js";
import { createPlayer, getMyPlayers } from "../controllers/user.controller.js";
import { getUsers, updateUser, deleteUser } from "../controllers/admin.controller.js";

const router = Router();

// RUTAS PARA EL USUARIO
router.get('/myplayers', verifyToken, getMyPlayers);

// RUTAS ADMINISTRADOR
router.get('/user', verifyToken, isAdmin, getUsers); // muestra todos los usuarios
router.patch('/user/:id', verifyToken, isAdmin, updateUser); // actualiza un usuario
router.delete('/user/:id', verifyToken, isAdmin, deleteUser); // elimina un usuario
router.post('/players', verifyToken, isAdmin, createPlayer); // crea un jugador

export default router;
