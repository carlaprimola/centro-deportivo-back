import mongoose from "mongoose";
import path from 'path';
import app from './app.js';
import express from "express";

const connectDB = async () => {
  try {
    //await mongoose.connect("mongodb+srv://carla:123@cluster0.yxcgqr7.mongodb.net/todo")
    await mongoose.connect("mongodb+srv://sudosu:settym-surzuv-2fuQqo@free-cluster.zgdlrwr.mongodb.net/centro_deportivo")
    console.log("🎉 Conectado a MongoDB");
  } catch (error) {
    console.log("❌ Error al conectar a MongoDB", error);
  }
};

export default connectDB;



