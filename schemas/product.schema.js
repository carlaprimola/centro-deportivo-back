import { z } from 'zod';

// Definir el esquema de Zod
export const createProductSchema = z.object({
  name: z.string().min(2, { message: 'Nombre demasiado corto' }).max(50, { message: 'Nombre demasiado largo' }),
  description: z.string().min(10, { message: 'Descripción demasiado corta' }).max(500, { message: 'Descripción demasiado larga' }),
  price: z.number().min(0.01, { message: 'Precio inválido' }),
  category: z.string().min(2, { message: 'Categoría demasiado corta' }).max(50, { message: 'Categoría demasiado larga' }),
  stock: z.number().int().min(0, { message: 'Stock inválido' }),
  image: z.string().url({ message: 'URL de imagen inválida' }),
  rating: z.object().optional(), // Aunque está comentado en tu modelo original
});


