import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import memberPaymentRouter from './routes/memberPayment.routes.js';
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import ProductRouter from "./routes/product.routes.js";
import OrderRouter from "./routes/orders.routes.js";
import assignTeamRouter from "./routes/teams.routes.js";
import rateLimit from 'express-rate-limit'; 

const app = express();
// Confía en el encabezado X-Forwarded-For
app.set('trust proxy', 1);

// Sanitización contra NoSQL query injection (capa extra adicional al modelo User que ya espera un String)
app.use(ExpressMongoSanitize());

// Sanitización contra site script XSS
app.use(xss());

// Sanitización de los encabezados HTTP con Helmet
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

// Configuración de CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'https://centrodeportivoca.netlify.app'],
    credentials: true
};
app.use(cors(corsOptions));

app.use(cookieParser()); // Middleware para manejar cookies
app.use(express.json());

// Aplica el límite de velocidad
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de solicitudes por IP
});

// Aplica el límite de velocidad a todas las solicitudes
app.use(limiter);

app.use('/uploads', express.static('uploads'));

// Rutas
app.use("/api", authRoutes);
app.use("/api/payments", memberPaymentRouter);
app.use("/api/player", assignTeamRouter);
app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);

// Middleware para permitir solicitudes CORS desde cualquier origen
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permitir solicitudes desde cualquier origen
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Métodos permitidos
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Encabezados permitidos
  next();
});

// Ruta de prueba para verificar CORS
app.get("/test-cors", (req, res) => {
  res.json({ message: "¡CORS está funcionando correctamente!" });
});

export default app;
