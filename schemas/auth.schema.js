import {z} from 'zod' 
import validator from 'validator';
import xss from 'xss'; 


//Funcion para validar si el email es válido
function isValidEmail(email) {
  email = email.trim().toLowerCase(); //elimina espacios y transforma el texto en minusculas
  return email.length <= 100 && validator.isEmail(email); //menos de 100 caracteres y valida formato email
}

// Validar registro
export const registerSchema = z.object({
  // username: z.string({
  //   required_error: "El nombre de usuario es requerido"
  // })
  // .min(3, {
  //   message: "Username debe tener mínimo 3 caracteres",
  // })
  // .max(10,{
  //   message: "Username debe tener máximo 10 caracteres",
  // }),
  email: z.string({
    required_error: "El correo electrónico es requerido",
    
  }).email({
    message: "Correo inválido"
  })
  .refine((value) => {
    // Validar si el formato del correo electrónico no es correcto utilizando la función isValidEmail
    return isValidEmail(value);
  }, {
    message: "El formato del email no es válido",
  }),
  password: z.string({
    required_error: "La contraseña es requerida",
    })
    .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres"})
    })

//   import Joi from 'joi';

// export const registerSchema = Joi.object({
//     name: Joi.string().min(3).max(30).required(),
//     lastname: Joi.string().min(3).max(30).required(),
//     email: Joi.string().email().required(),
//     mobile: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
//     password: Joi.string().min(6).max(20).required(),
//     rol_id: Joi.string().valid('user', 'admin'),
//     honeypot: Joi.string().allow(''),
//     timestamp: Joi.number().required(),
// });



//Validar login
export const loginSchema = z.object({
    email: z.string({
      required_error: "El correo electrónico es requerido",
        
      }).email({
      message: "Correo inválido"
      }),
    password: z.string({
       required_error: "La contraseña es requerida",
        })
        .min(6, {
       message: "La contraseña debe tener al menos 6 caracteres"})
})

// Función para limpiar y validar los datos de entrada
// export function cleanAndValidate(data, schema) {
//   // Limpiar los datos de entrada
//   const cleanData = Object.fromEntries(
//     Object.entries(data).map(([key, value]) => [key, xss(value)])
//   );

//   // Validar los datos limpios
//   return schema.parse(cleanData);
// }