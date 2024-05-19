//validar Token
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = async (req, res, next) => {
    
    //Si hay token puedes continuar, sino te bloquea
    const {token} = req.cookies;
    
    if (!token) 
        return res.status(401).json({message: 'Acceso no autorizado'});

        jwt.verify(token, TOKEN_SECRET,(err, user, name) => {
            if(err) return res.status(403).json({message: 'El token no es válido'});

            req.user = { _id: user._id } //Aquí asigno el id del usuario authenticado a req.user
            req.name = { name: name._id}
            next();
        })
   
}