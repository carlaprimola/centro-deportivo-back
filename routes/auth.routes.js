import { Router } from "express";
import { login, 
  logout, 
  register,  
  verifyToken, 
  getAllUsers,
  getUserById, 
  updateUser, 
  deleteUser,
  isAdmin } from "../controllers/auth.controller.js";
  // import { getUsers } from "../controllers/admin.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
// import rateLimit from "express-rate-limit";
import { get } from "mongoose";

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
 

//rutas publicas
router.post('/register', validateSchema(registerSchema), register)  
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)



//rutas para el admin
// el admin será el encargado de la gestión de los usuarios, es el que puede ver todos los usuarios, mmodificarlo, eliminarlos y ver un usuario en concreto
router.get('/user', verifyToken, isAdmin, getAllUsers); //muestra todos los usuarios
// router.get('/user', getAllUsers);
router.get('/user/:id',verifyToken,isAdmin, getUserById);
router.patch('/user/:id', verifyToken, isAdmin, updateUser); //actualiza un usuario
// router.patch('/user/:id', updateUser); 
router.delete('/user/:id', verifyToken, isAdmin, deleteUser); //elimina un usuario
// router.delete('/user/:id', deleteUser);

//rutas protegidas
router.get('/verify', verifyToken)
//comprobado en consola
// router.get('/profile', authRequired, profile);
//Este middleware se utiliza para verificar si el usuario está autenticado verificando la existencia y validez del token JWT. Verifica que esté aplicado en rutas que requieren autenticación, como /profile
//si hace falta añadir la parte de perfil o igual es mejor dashboard si al final hacemos la home del dashboard

export default router;