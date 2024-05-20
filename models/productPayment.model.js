import mongoose from 'mongoose';
import { string } from 'zod';

const productPaymentSchema = new mongoose.Schema({
  user_id: {
   type : String ,
    required: true
  },
  sumary : {
type : String,
require: true
  },
product_payment: {
    status: {
      type: Boolean,
      default: false
    },
    document: {
      type: String 
    }
  },

}, {
  timestamps: true,
  collection: "product_payments",
  versionKey: false
});

// Crear el modelo a partir del esquema
const productPayment = mongoose.model('ProductPayment', productPaymentSchema);

export default productPayment;
