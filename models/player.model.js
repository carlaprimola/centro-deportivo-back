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
  age: {
    type: String,
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
     enum: ["S", "M", "L", "XL"],
     required: true,
   },
  pants_size: {
     type: Number,
     enum: [34, 36, 38, 40],
     required: true,
   },
   shoe_size: {
     type: Number,
     enum: [36, 37, 38, 39, 40, 41, 42],
     required: true,
   },
  status: {
    type: Boolean,
    default: false,
    required: true,
    index: true,
  },
  payments: {
    type: Schema.Types.ObjectId,
    ref: "MembershipPayment",
    required: false,
    index: true,
  }
}, {
  timestamps: true,
  versionKey: false // Para que no aparezca la versión del documento en la base de datos
});

// Exportar el modelo con la función model de mongoose que recibe el nombre del modelo y el esquema
export default model('Player', playerSchema);
