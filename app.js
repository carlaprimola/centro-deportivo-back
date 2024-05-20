import express from "express";
/* import morgan from 'morgan'; */
/* import cookieParser from 'cookie-parser'; */
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import v1ProductRouter from './routes/product.routes.js'
import memberPaymentRouter from './routes/memberPayment.routes.js'



/* import authRoutes from './routes/auth.routes.js'*/


import cookieParser from 'cookie-parser';
import cors from "cors";
import ProductRouter from "./routes/product.routes.js";
import PlayerRouter from "./routes/player.routes.js";
import authRoutes from './routes/auth.routes.js'

const app = express();


app.use(cors());
/* app.use(morgan('dev')); */ //simplifica el proceso de registros

app.use(cors({
    origin:'http://localhost:5173',
}));

app.use(express.json());
app.use(cookieParser());

/* app.use('/', (req, res) =>{
    res.json({message: 'Bienvenido a la API de Proyectos'})
}) */
//añadimos /api antes de la ruta para distinguirlo de las rutas del front
app.use("/api/auth", authRoutes);
app.use("/api/products", v1ProductRouter) 
app.use("/api/payments", memberPaymentRouter) 




//-_- Ruta productos -_-
app.use("/api/products", ProductRouter);
app.use("/api/", authRoutes)

//-_- Ruta base de jugadores -_-
app.use("/api/players", PlayerRouter);

export default app;
