import mongoose from "mongoose";
import dotenv from "dotenv";

const db = () => {
  dotenv.config();
  try {
    const db = mongoose.connect(process.env.MONGODB_URL, {
    
    });
    console.log("Conexión con la base de datos MongoDB exitosa");
  } catch (error) {
    console.log("Error en conectar con la base de datos MongoDB");
    console.log(error);
  }
};
export {db} ;

// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });



