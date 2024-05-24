import express from "express";
/* import morgan from 'morgan'; */
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import memberPaymentRouter from './routes/memberPayment.routes.js'
import productPayment from "./routes/productPayment.routes.js";
/* import authRoutes from './routes/auth.routes.js'*/


import cookieParser from 'cookie-parser';
import ProductRouter from "./routes/product.routes.js";
import PlayerRouter from "./routes/player.routes.js";
import orderRoutes from "./routes/orders.routes.js";

const app = express();


app.use(cors());
/* app.use(morgan('dev')); */ //simplifica el proceso de registros

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());


//añadimos /api antes de la ruta para distinguirlo de las rutas del front
app.use("/api/payments", memberPaymentRouter);
app.use("/api/", authRoutes) //NO BORRAR
app.use("/api/payments", productPayment)

//-_- Ruta productos -_-
app.use("/api/products", ProductRouter);

//-_- Ruta base de jugadores -_-
app.use("/api/players", PlayerRouter);

//-_- Ruta pedidos -_-
app.use("/api/orders", orderRoutes);

export default app;
