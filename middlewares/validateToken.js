//validar Token
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = async (req, res, next) => {
    
    //Si hay token puedes continuar, sino te bloquea
    const token = req.cookies.token || req.headers['authorization'];
    const role = req.body
    //console.log(`Rol del usuario autenticado: ${role}`);

//   if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

//         jwt.verify(token, TOKEN_SECRET,(err, user) => {
//             if (err) {
//                 return res.status(403).json({ message: 'El token no es válido' });
//             }

//             req.user = { _id: user._id, role: user.role } //Aquí asigno el id del usuario authenticado a req.user
//             next();
//         })
if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

    try {
        const payload = jwt.verify(token, TOKEN_SECRET);
        req.user = { _id: payload._id, rol_id: payload.role }; // Aquí asigno el id del usuario authenticado a req.user
        next();
    } catch (err) {
        return res.status(403).json({ message: 'El token no es válido' });
    }
}
   
