import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            // Si hay un error en la verificación del token, devuelve un error 403
            return res.status(403).json({ message: 'El token no es válido' });
        }

        // Asigna el rol del usuario al objeto req.user
        req.user = { _id: user._id, rol_id: user.rol_id };

        // Muestra el rol del usuario en la consola para depuración
        console.log(`😎Tipo rol: ${req.user.rol_id}`);

        // Continúa con el siguiente middleware
        next();
    });
};
