import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './db.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

// Configura el puerto
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Conecta a la base de datos antes de definir las rutas
connectDB().then(() => {
  // Define la ruta para obtener todos los usuarios
  app.get('/api/users', async (req, res) => {
    try {
      // Consulta la base de datos para obtener todos los usuarios
      const users = await User.find();

      // Devuelve los usuarios como respuesta
      res.json(users);
    } catch (error) {
      // Maneja cualquier error que ocurra
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  });

  // Define la ruta de bienvenida
  app.use('/', (req, res) =>{
    res.json({message: 'Bienvenido a la API de Centro Deportivo Ciudad Los Ángeles'})
  });

  // Añade las rutas de autenticación y tareas
  app.use("/api", authRoutes);
  app.use("/api", taskRoutes);

  // Inicia el servidor
  app.listen(3000, () => {
    console.log('✨ Servidor conectado', 3000);
  });
}).catch((error) => {
  console.error('❌ Error al iniciar el servidor:', error);
});

export default app;