 //Token
 import jwt from 'jsonwebtoken'
 import { TOKEN_SECRET } from "../config.js"


 export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
      jwt.sign(
         {
             ...payload,
             roles: ['user', 'admin'], // Agrega los roles aquí
         },
         TOKEN_SECRET,
         {
             expiresIn: '1d',
         },
         (err, token) => {
             if (err) reject("❌Error con el token:", err);
             resolve(token);
         }
     );
    })
 }
 