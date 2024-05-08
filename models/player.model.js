import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    team_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    father_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Player", playerSchema);
