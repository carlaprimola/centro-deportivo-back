import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb+srv://sudosu:settym-surzuv-2fuQqo@free-cluster.zgdlrwr.mongodb.net/centro_deportivo");
    console.log("🎉 Conectado a MongoDB");
    return connection;
  } catch (error) {
    console.log("❌ Error al conectar a MongoDB", error);
    throw error;
  }
};

export default connectDB;
