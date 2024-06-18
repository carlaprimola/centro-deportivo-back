import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import memberPaymentRouter from './routes/memberPayment.routes.js'
import PlayerRouter from './routes/player.routes.js'
// import productPayment from "./routes/productPayment.routes.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import ProductRouter from "./routes/product.routes.js";
import OrderRouter from "./routes/orders.routes.js";
import assignTeamRouter from "./routes/teams.routes.js";

const app = express();

app.use(ExpressMongoSanitize());
app.use(xss());
app.use(express.static('public'))
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trustedscripts.com'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// app.use('/uploads', express.static('uploads'));

//OJO ¿cambiar por X auth ?--- añadimos /api antes de la ruta para distinguirlo de las rutas del front 
app.use("/api/", authRoutes)
app.use("/api/payments", memberPaymentRouter);
// app.use("/api/pay", productPayment)
app.use("/api/player", assignTeamRouter)
app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);






//-_- RUTAS EN PRUEBA PARA PDF -_-
app.use("/api/players", PlayerRouter);
app.use("/api/memberships", memberPaymentRouter);






// app.get('public/uploads/:filename', );

export default app;
