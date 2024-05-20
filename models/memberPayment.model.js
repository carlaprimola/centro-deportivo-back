import mongoose from 'mongoose';
import { string } from 'zod';

const membershipPaymentSchema = new mongoose.Schema({
  // Poner el object id
  player_id: {
    type: String,
    required: true
  },
  annual_payment: {
    type: Boolean,
    default: false
  },
  first_payment: {
    status: {
      type: Boolean,
      default: false
    },
    document: {
      type: String 
    }
  },
  second_payment: {
    status: {
      type: Boolean,
      default: false
    },
    document: {
      type: String 
    }
  },
  third_payment: {
    status: {
      type: Boolean,
      default: false
    },
    document: {
      type: String 
    }
  }
}, {
  timestamps: true,
  collection: "membership_payments",
  versionKey: false
});

// Crear el modelo a partir del esquema
const MembershipPayment = mongoose.model('MembershipPayment', membershipPaymentSchema);

export default MembershipPayment;
