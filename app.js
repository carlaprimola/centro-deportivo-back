import express from "express";
/* import morgan from 'morgan'; */
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import memberPaymentRouter from './routes/memberPayment.routes.js'

import cookieParser from 'cookie-parser';
import ProductRouter from "./routes/product.routes.js";
import PlayerRouter from "./routes/player.routes.js";

const app = express();


app.use(cors());
/* app.use(morgan('dev')); */ //simplifica el proceso de registros

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true, //esto es lo que permite credenciales (cookies, autorizaciones)
}));

app.use(express.json());
app.use(cookieParser());

/* app.use('/', (req, res) =>{
    res.json({message: 'Bienvenido a la API de Proyectos'})
}) */

//añadimos /api antes de la ruta para distinguirlo de las rutas del front
app.use("/api/payments", memberPaymentRouter) ;
app.use("/api/", authRoutes)



//-_- Ruta productos -_-
app.use("/api/products", ProductRouter);


//-_- Ruta base de jugadores -_-
app.use("/api/players", PlayerRouter);

export default app;
