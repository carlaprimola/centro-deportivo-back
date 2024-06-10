import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
    index: true,
  },
  description: {
    type: String,
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
  sizes: {
    type: [String], // Array de strings para almacenar las tallas
    enum: ["Talla única", "3XS", "2XS", "XS", "S", "M", "L", "XL", "XXL"],
    required: false,
  },
}, {
  timestamps: true,
  versionKey: false, // -_- para que no aparezca la versión del documento en la base de datos
});

export default model('Product', productSchema);