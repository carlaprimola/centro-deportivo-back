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
  team_id: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: false,
    index: true,
  },
  gender: {
    type: String,
    required: true,
    index: true,
  },
  allergies: {
    type: String,
    index: true,
  },
  injuryOrIllness: {
    type: String,
    index: true,
  },
  // shirtSize: {
  //   type: String,
  //   enum: ["S", "M", "L", "XL"],
  //   required: true,
  // },
  // pantsSize: {
  //   type: String,
  //   enum: ["34", "36", "38", "40"],
  //   required: true,
  // },
  // shoeSize: {
  //   type: String,
  //   enum: ["36", "37", "38", "39"],
  //   required: true,
  // },
  status: {
    type: Boolean,
    default: false,
    required: true,
    index: true,
  },
}, {
  timestamps: true,
  versionKey: false // Para que no aparezca la versión del documento en la base de datos
});

// Exportar el modelo con la función model de mongoose que recibe el nombre del modelo y el esquema
export default model('Player', playerSchema);
