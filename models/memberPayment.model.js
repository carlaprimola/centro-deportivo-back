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
    status: {
      type: String,
      enum: ['pendiente', 'aceptado', 'none', 'rechazado'],
      default: 'none'
  },
  document: {
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    destination: { type: String },
    filename: { type: String },
    path: { type: String },
    size: { type: Number }
    },
    contentType: {
      type: String,
      // enum: ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    }
  },

  first_payment: {
    status: {
      type: String,
      enum: ['pendiente', 'aceptado', 'none', 'rechazado'],
      default: 'none'
    },
  document: {
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    destination: { type: String },
    filename: { type: String },
    path: { type: String },
    size: { type: Number }
    },
    contentType: {
      type: String,
      enum: ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    }
  },

  second_payment: {
    status: {
      type: String,
      enum: ['pendiente', 'aceptado', 'none', 'rechazado'],
      default: 'none'
  },
  document: {
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    destination: { type: String },
    filename: { type: String },
    path: { type: String },
    size: { type: Number }
    },
    contentType: {
      type: String,
      enum: ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    }
  },

  third_payment: {
    status: {
      type: String,
      enum: ['pendiente', 'aceptado', 'none', 'rechazado'],
      default: 'none'
  },
  document: {
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    destination: { type: String },
    filename: { type: String },
    path: { type: String },
    size: { type: Number }
    },
    contentType: {
      type: String,
      enum: ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    }
  }
}, {
  timestamps: true,
  collection: "membership_payments",
  versionKey: false
});


export default model('MembershipPayment', membershipPaymentSchema);

