import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
// import { cleanAndValidate } from '../schemas/auth.schema.js';
import { registerSchema } from '../schemas/auth.schema.js';
import { loginSchema } from '../schemas/auth.schema.js';


//Register
export const register = async (req, res) => {
    console.log("Datos recibidos para el registro:", req.body);
    const { name, lastname, email, mobile, password, rol_id, honeypot, timestamp } = req.body;      

    if (honeypot) {
        // si el campo honeypot tiene algún valor, es probable que sea un bot
        return res.status(400).send({ error: 'Alerta bot 🤖'});        
      }

      // Obtener la fecha actual del servidor
    const serverTimestamp = Date.now();

      // Comprobar si el formulario se envió demasiado rápido
      const timeElapsed = serverTimestamp - timestamp;
      const clientTimestamp = timestamp; // Definir clientTimestamp usando el valor del timestamp enviado por el cliente
      if (timeElapsed < 1000) { // 1000 milisegundos = 1 segundo
          return res.status(400).send({ error: 'El formulario se envió demasiado rápido 🤖'});
      }

    // Validar el valor de rol_id solo si se proporciona en la solicitud
    if (rol_id && rol_id !== "admin" && rol_id !== "user") {
        return res.status(400).json({ message: "Ese rol no existe" });
    }
    
    try {
        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(400).json({ message: ["El email ya existe"] });
        }

        const passwordHash = await bcrypt.hash(password, 10); //encripta password

        const newUser = new User({
            name,
            lastname,
            email,
            mobile,
            password: passwordHash,
            rol_id: rol_id || "user", // Utiliza el valor proporcionado o el valor predeterminado "user"
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ _id: userSaved._id });
        console.log('token generado para registro:', token);
        res.cookie("token", token);
        res.json({
            // id: userSaved._id,
            name: userSaved.name,
            lastname: userSaved.lastname,
            // username: userSaved.username,
            email: userSaved.email,
            mobile: userSaved.mobile,
            password: userSaved.password,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
            rol_id: userSaved.rol_id,
        });
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Algo salió mal, intente más tarde' });
    }
};

// Login
export const login = async (req, res) => {
    console.log('Datos recibidos para inicio de sesión:', req.body);
    const { email, password } = req.body;
    
    try {
        // Comprobar que el usuario existe
        const userLogged = await User.findOne({ email })
        if (!userLogged) return res.status(400).json({ message: 'Usuario no encontrado' })

        const isMatch = await bcrypt.compare(password, userLogged.password) 
        if (!isMatch) return res.status(400).json({ message: 'La contraseña es incorrecta' })

        // Si la contraseña es correcta, puedes proceder con el inicio de sesión y generar el token de acceso.   
        const token = await createAccessToken({ _id: userLogged._id })
        console.log('token generado para inicio de sesión', token)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // las cookies solo se envían a través de HTTPS en producción
            maxAge: 3600000, // duración de la cookie
            sameSite: "strict" // las cookies solo se envían al mismo sitio
        })

        // Solo una respuesta para evitar el error
        res.json({
            message: 'Inicio de sesión exitoso',
            user: {
                id: userLogged._id,
                name: userLogged.name,
                lastname: userLogged.lastname,
                email: userLogged.email,
                mobile: userLogged.mobile,
                role: userLogged.tipoRol,
                isAdmin: userLogged.tipoRol === 'admin'
            }
        });
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Algo salió mal, intente más tarde' });
    }
};

export const logout = async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  });
  return res.sendStatus(200);
}

export const verifyToken = async (req, res, next) => {
    const { token } = req.cookies;
    console.log('Verificando token', token)
    if (!token) return res.status(401).json({ message: "No se ha encontrado ningún token" });
    
    try {
        const payload = jwt.verify(token, TOKEN_SECRET);
        console.log("El token es válido y su payload es:", payload);
        const userFound = await User.findById(payload._id);
        if (!userFound) return res.status(403).json({ message: 'Usuario no encontrado' });

        req.user = userFound;
        next();
    } catch (error) {
        console.error('El token no es válido:', error);
        res.status(500).json({ message: 'Hubo un error al verificar el token' });
    }
}

export const isAdmin = (req, res, next) => {
    try {
        if (req.user.rol_id !== 'admin') {
            return res.status(403).json({ message: 'Requiere rol de administrador' });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al verificar el rol del usuario' });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

export const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updateFields = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(updatedUser);
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};