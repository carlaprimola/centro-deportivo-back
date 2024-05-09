import mongoose from 'mongoose';

// Definir el esquema del modelo
const duePaymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  category : {
    type: String,
    require: true
  },
  voucher_img: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Crear el modelo a partir del esquema
const DuePayment = mongoose.model('membership_payments', duePaymentSchema);

export default DuePayment;
