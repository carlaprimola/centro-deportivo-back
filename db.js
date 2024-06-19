import mongoose from "mongoose";
import dotenv from "dotenv";

const db = () => {
  dotenv.config();
  try {
    const db = mongoose.connect(process.env.MONGODB_URL, {

    });
    
  } catch (error) {
   
  }
};
export { db };


