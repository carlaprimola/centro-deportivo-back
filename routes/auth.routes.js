import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, 
  logout, 
  register, 
  profile, 
  verifyToken, 
  getAllUsers, 
  updateUser, 
  deleteUser,
  isAdmin } from "../controllers/auth.controller.js";
import { getUsers } from "../controllers/admin.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { getMyPlayers, createPlayer } from "../controllers/users.players.controller.js";
import { getPlayersCtlr } from "../controllers/players.controller.js";
const router = Router()



// Limitar la cantidad de intentos de inicio de sesión
const limitLogin = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 3, // Max number of entries to try log in
    message: 'Too many fail requests, try again in 15 minutes',
});


router.post('/register', validateSchema(registerSchema), register)  
router.post('/login', limitLogin, validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/verify', verifyToken)
// router.get('/profile', authRequired, profile)
// router.get('/profile', profile)

//RUTAS PARA EL USUARIO (Dentro de la sesión de usuario)
router.get('/myplayers', authRequired, getMyPlayers);
router.post('/newplayer', authRequired, createPlayer);

//rutas para el admin
router.get('/user', isAdmin, getUsers); //muestra todos los usuarios ,
router.get('/players',verifyToken, isAdmin ,getPlayersCtlr)
router.patch('/user/:id', authRequired, updateUser); //actualiza un usuario
router.delete('/user/:id', authRequired, deleteUser); //elimina un usuario

export default router;