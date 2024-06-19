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

