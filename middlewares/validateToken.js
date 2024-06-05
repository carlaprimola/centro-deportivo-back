//validar Token
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    try {
        const decodedToken = jwt.verify(token, TOKEN_SECRET);
        req.user = { _id: decodedToken._id, rol_id: decodedToken.rol_id }; // Asigna el ID y el rol del usuario autenticado a req.user
        console.log(`Rol del usuario autenticado: ${decodedToken.rol_id}`);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'El token no es válido' });
    }
};