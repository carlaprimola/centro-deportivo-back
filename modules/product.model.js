import { Schema, model } from "mongoose";

const productSchema = new Schema({
  
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
    index: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  stock: {
    type: Number,
    required: true,
    index: true,
  },
  image: {
    type: String,
    required: true,
    index: true,
  },
  rating: Object, // Aunque está comentado en tu modelo original
}, {
  timestamps: true,
  versionKey: false // Para que no aparezca la versión del documento en la base de datos
});

export default model('Product', productSchema);
