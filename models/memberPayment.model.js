import { Schema, model } from "mongoose";

const membershipPaymentSchema =  new Schema({
  players_id: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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


export default model('MembershipPayment', membershipPaymentSchema);

