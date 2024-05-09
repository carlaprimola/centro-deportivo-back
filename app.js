//importamos express
import express from 'express';
/* import morgan from 'morgan'; */
/* import cookieParser from 'cookie-parser'; */
import cors from 'cors';

import v1ProductRouter from './routes/product.routes.js'
import authRoutes from './routes/auth.routes.js'



const app = express();

//configuramos el puerto
/* app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
})); */

app.use(cors());
/* app.use(morgan('dev')); */ //simplifica el proceso de registros
app.use(express.json());
/* app.use(cookieParser()); */



/* app.use('/', (req, res) =>{
    res.json({message: 'Bienvenido a la API de Proyectos'})
}) */
//añadimos /api antes de la ruta para distinguirlo de las rutas del front
app.use("/api/products", v1ProductRouter) 
app.use("/api/", authRoutes)

export default app;