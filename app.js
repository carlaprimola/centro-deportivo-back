import express from "express";
/* import morgan from 'morgan'; */
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import memberPaymentRouter from './routes/memberPayment.routes.js'
import productPayment from "./routes/productPayment.routes.js";
/* import authRoutes from './routes/auth.routes.js'*/
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import ProductRouter from "./routes/product.routes.js";
//import PlayerRouter from "./routes/player.routes.js";
import OrderRouter from "./routes/orders.routes.js";
import assignTeamRouter from "./routes/teams.routes.js";

const app = express();

// sanitización contra NoSQL query injection (capa extra adicional al modelo User que ya espera un String)
app.use(ExpressMongoSanitize());

// sanitización contra site script XSS
app.use(xss());


// sanitización de los encabezados HTTP
app.use(helmet());
// Configuración adicional de Helmet
app.use(helmet.frameguard({ action: 'deny' }));


// Configuración de Content Security Policy (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trustedscripts.com'], // Ajusta esto según tus necesidades
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

/* app.use(morgan('dev')); */ //simplifica el proceso de registros

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser()); // Middleware para manejar cookies
app.use(express.json());


//añadimos /api antes de la ruta para distinguirlo de las rutas del front
app.use("/api/", authRoutes)


app.use("/api/payments", memberPaymentRouter);
app.use("/api/pay", productPayment)
app.use("/api/player", assignTeamRouter)


//-_- Ruta productos -_-
app.use("/api/products", ProductRouter);

//-_- Ruta base de jugadores -_-
// app.use("/api/players", PlayerRouter);


//-_- Ruta pedidos -_-
app.use("/api/orders", OrderRouter);


export default app;
