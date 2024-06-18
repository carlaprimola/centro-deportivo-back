// Verificación de Rol de Administrador
export const isAdmin = (req, res, next) => {
    try {
      console.log("Usuario:", req.user); // Log para ver el usuario
      if (req.user.rol_id !== "admin") {
        return res.status(403).json({ message: "Requiere rol de administrador" });
      }
      next();
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al verificar el rol del usuario" });
    }
  };