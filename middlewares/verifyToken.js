import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//VerifyToken  
export const verifyToken = async (req, res, next) => {
    const { token } = req.cookies;   
    if (!token)
      return res
        .status(401)
        .json({ message: "No se ha encontrado ningún token" });
      try {
      const payload = jwt.verify(token, TOKEN_SECRET);
       const userFound = await User.findById(payload._id);
      if (!userFound)
        return res.status(403).json({ message: "Usuario no encontrado" });
      req.user = userFound;
      next();
    } catch (error) {
       res.status(500).json({ message: "Hubo un error al verificar el token" });
    }
  };