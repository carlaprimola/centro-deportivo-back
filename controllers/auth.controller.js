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
    console.log(req.body);
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
            observations,
            rol_id: rol_id || "user", // Utiliza el valor proporcionado o el valor predeterminado "user"
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ _id: userSaved._id });
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
    const { email, password } = req.body;
    
    try {
        // Comprobar que el usuario existe
        const userLogged = await User.findOne({ email })
        if (!userLogged) return res.status(400).json({ message: 'Usuario no encontrado' })

        const isMatch = await bcrypt.compare(password, userLogged.password) 
        
        if (!isMatch) return res.status(400).json({ message: 'La contraseña es incorrecta' })

        // Si la contraseña es correcta, puedes proceder con el inicio de sesión y generar el token de acceso.   
        const token = await createAccessToken({ _id: userLogged._id })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // las cookies solo se envían a través de HTTPS en producción
            maxAge: 3600000, // duración de la cookie
            sameSite: "strict" // las cookies solo se envían al mismo sitio
        })

        // Enviar una respuesta adecuada, por ejemplo, un mensaje de éxito junto con el token.
        res.json({ message: 'Inicio de sesión exitoso', token });

        // Verificar el rol del usuario
        if (userLogged.tipoRol === 'user') {
            // Usuario con rol de usuario normal
            // Realizar acciones específicas para el rol de user
                res.json({
                id: userLogged._id,
                name: userLogged.name,
                lastname: userLogged.lastname,
                email: userLogged.email,
                mobile: userLogged.mobile,
                role: userLogged.tipoRol,
                isAdmin: false,               
                tipoRol: userLogged.tipoRol,
            });
        } else {
            // Usuario con rol de admin
            // Realizar acciones específicas para el rol de admin
            res.json({
                id: userLogged._id,
                name: userLogged.name,
                lastname: userLogged.lastname,
                email: userLogged.email,
                mobile: userLogged.mobile,
                role: userLogged.tipoRol,
                isAdmin: true,
                tipoRol: userLogged.tipoRol,
            });
        }
    } catch (error) {
        console.log('❌', error)
        res.status(500).json({ message: 'Algo salió mal, intente más tarde' })
    }
}

//Logout
export const logout = async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  });
  return res.sendStatus(200);
}

// export const profile = async (req, res) => {
//    const userFound = await User.findById(req.user._id)

//    if(!userFound) return res.status(403).json({message: 'Usuario no encontrado'})

//    return res.json({
//     id: userLogged._id,
//     name: userLogged.name,
//     lastname: userLogged.lastname,
//     email: userLogged.email,
//     mobile: userLogged.mobile,
//     role: userLogged.tipoRol,
//     createdAt: userFound.createdAt,
//     updatedAt: userFound.updatedAt,
//    })
// }

   //no dejar continuar tras el login si no hay token
   export const verifyToken = async (req, res, next) => {
    const {token} =  req.cookies
    console.log("🔐",req.cookies)
    if (!token) return res.status(401).json({message: "No se ha encontrado ningún token"})
    
    try {
        // Verificar el token
        const payload = jwt.verify(token, TOKEN_SECRET);
        console.log('El token es válido y su payload es:', payload);

        const userFound = await User.findById(payload._id)
        if(!userFound) return res.status(403).json({message: 'Usuario no encontrado'})

        req.user = userFound; // Adjuntar el usuario al objeto de solicitud
        next(); // Pasar al siguiente middleware o controlador
    } catch (error) {
        console.error('El token no es válido:', error);
        res.status(500).json({message: 'Hubo un error al verificar el token'});
    }
}

    //Verificar el tipo de rol
    export const isAdmin = (req, res, next) => {
        try {
            if (req.user. rol_id !== 'admin') {
                return res.status(403).json({message: 'Requiere rol de administrador'});
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Hubo un error al verificar el rol del usuario'});
        }
    }   


// Controlador para mostrar todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log(users)
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

// Controlador para obtener un usuario por su ID
export const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};


// Controlador para actualizar un usuario
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updateFields = req.body; // Campos a actualizar

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

// Controlador para eliminar un usuario
export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Devolver el mensaje "Usuario eliminado correctamente" en lugar de los datos del usuario
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.log('❌', error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

// Función para manejar el registro de usuarios
export const cleanRegister = async (req, res) => {
    try {
      const cleanData = cleanAndValidate(req.body, registerSchema);
      const user = await User.create(cleanData);
     console.log(user);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      return res.status(400).json({message: error.errors.map(err => err.message)});
    }
  };

  // Función para manejar el inicio de sesión de usuarios
export const cleanLogin = async (req, res) => {
    try {
      const cleanData = cleanAndValidate(req.body, loginSchema);
      // Procesa cleanData
    } catch (error) {
      return res.status(400).json({message: error.message
    })
}
  };
  


