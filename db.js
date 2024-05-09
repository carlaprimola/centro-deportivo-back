import mongoose from "mongoose";
import path from 'path';
import app from './app.js';
import express from "express";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sudosu:settym-surzuv-2fuQqo@free-cluster.zgdlrwr.mongodb.net/")
    console.log("🎉 Conectado a MongoDB");
  } catch (error) {
    console.log("❌ Error al conectar a MongoDB", error);
  }
};

// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

export default connectDB;



