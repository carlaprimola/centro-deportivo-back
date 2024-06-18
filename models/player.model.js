import { Schema, model } from "mongoose";

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  lastname: {
    type: String,
    required: true,
    index: true,
  },
  birthdate: {
    type: Date,
    required: true,
    index: true,
  },
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  dni: {
    type: String,
    required: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
    index: true,
  },
  post_code: {
    type: String,
    required: true,
    index: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: false,
    index: true,
  },
  allergies: {
    type: String,
    index: true,
  },
  injury_illness: {
    type: String,
    index: true,
  },
  shirt_size: {
    type: String,
    enum: ["3XS", "2XS", "XS", "S", "M", "L", "XL", "XXL"],
    required: true,
  },
  pants_size: {
    type: String,
    enum: ["3XS", "2XS", "XS", "S", "M", "L", "XL", "XXL"],
    required: true,
  },
  shoe_size: {
    type: Number,
    enum: [35, 36, 37, 38, 39, 40, 41, 42],
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
    index: true,
  },
  membership_payments: [{
    type: Schema.Types.ObjectId,
    ref: "MembershipPayment",
    required: false,
    index: true,
  }]
}, {
  timestamps: true,
  versionKey: false // Para que no aparezca la versión del documento en la base de datos
});

//Cálculo de edad y actualización en el tiempo
playerSchema.virtual('age').get(function () {
  const today = new Date();
  const birthDate = new Date(this.birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Habilitar virtuals en el JSON de salida
playerSchema.set('toJSON', { virtuals: true });
playerSchema.set('toObject', { virtuals: true });

// Exportar el modelo con la función model de mongoose que recibe el nombre del modelo y el esquema
export default model('Player', playerSchema);
