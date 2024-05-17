import { Schema, SchemaType, model } from "mongoose";


const playerSchema = new Schema({

  name: {
    type: String,
    required: true,
    index:true,
  },
  lastname: {
    type: String,
    required: true,
    index:true,
  },
  birthdate: {
    type: Date,
    required: true,
    index:true,
  },
  size: {
    type: String,
    required: true,
    index:true,
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
    index:true,
  },
  status: {
    type: Boolean, default: false,
    required: true,
    index:true,
  },
  gender: {
    type: String,
    required: true,
    index:true,
  },
  father_id: {
    type: Schema.Types.ObjectId,
    ref:"user",
    required: true,
    index:true,
  }
  
,  


},
{
  timestamps: true,
  versionKey: false // -_- para que no aparezca la versión del documento en la base de datos
})

// -_- Exportar el modelo con la funcion model de mongoose que recibe el nombre del modelo y el esquema
export default model('Player', playerSchema)