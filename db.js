import mongoose from "mongoose";

const db = () => {
  try {
    const db = mongoose.connect("mongodb+srv://sudosu:settym-surzuv-2fuQqo@free-cluster.zgdlrwr.mongodb.net/centro_deportivo");
    console.log("Conexión con la base de datos MongoDB exitosa");
  } catch (error) {
    console.log("Error en conectar con la base de datos MongoDB");
    console.log(error);
  }
};
export { db };

// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });





