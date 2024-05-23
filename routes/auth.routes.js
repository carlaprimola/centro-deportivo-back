import { Router } from "express";
import { login, 
  logout, 
  register,   
  verifyToken,  
  updateUser, 
  deleteUser,
  isAdmin } from "../controllers/auth.controller.js";
import { getUsers } from "../controllers/admin.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { getMyPlayers, createPlayer } from "../controllers/users.players.controller.js";
import rateLimit from "express-rate-limit";
import { getPlayersCtlr } from "../controllers/players.controller.js";
const router = Router()


// Configuración de límite de intentos
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutos
//     max: 3, // 3 intentos
//     message: 'Has excedido el límite de intentos. Por favor, inténtalo más tarde.',
//     headers: true,
//     // handler: function(req, res) {
//     //   console.log('Se ha superado el límite de intentos para esta ruta.');
//     //   res.status(429).send('Has excedido el límite de intentos. Por favor, inténtalo más tarde.');
//     //   toast.error('Has excedido el límite de intentos. Por favor, inténtalo más tarde.');
//     // }
//   }); 
 


router.post('/register', validateSchema(registerSchema), register)  
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
// router.get('/verify', verifyToken)

//RUTAS PARA EL USUARIO (Dentro de la sesión de usuario)
router.get('/myplayers', authRequired, getMyPlayers); //mis jugadores en user
router.post('/newplayer', authRequired, createPlayer);

//rutas para el admin
router.get('/user', verifyToken, isAdmin, getUsers); //muestra todos los usuarios ,
router.get('/players',verifyToken, isAdmin ,getPlayersCtlr); //todos los jugadores en admin
router.patch('/user/:id', authRequired, updateUser); //actualiza un usuario
router.delete('/user/:id', authRequired, deleteUser); //elimina un usuario

export default router;