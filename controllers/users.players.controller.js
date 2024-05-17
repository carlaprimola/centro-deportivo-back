import Player from "../models/player.model.js";

export const getMyPlayers = async (req, res) => {
  try {
    console.log("Entrando en users.players controller getPlayersByUser");
    
    // Supongamos que `req.userId` contiene el ID del usuario autenticado
    const userId = req.userId;
    
    // Consulta solo los jugadores creados por el usuario autenticado
    const usersPlayers = await Player.find({ createdBy: userId });
    
    console.log(`Players del usuario: ${userId}`);
    
    // Enviar los jugadores obtenidos en la respuesta
    res.status(200).json(usersPlayers);
  } catch (error) {
    console.error(`Error en getPlayersByUser: ${error.message}`);
    res.status(500).json({ message: "Error al obtener los jugadores" });
  }
};

export const createPlayer = async (req, res) => {
  try {
    console.log("Creando nuevo jugador");

    // Obtener los datos del jugador del cuerpo de la solicitud
    const {
      name,
      lastname,
      birthdate,
      size,
      team_id,
      status,
      gender,
    } = req.body;

     // Obtener el father_id del usuario autenticado (asumimos que el middleware de autenticación añade req.userId)
     const father_id = req.userId;

    // Crear un nuevo jugador en la base de datos
    const newPlayer = await Player.create({
      name,
      lastname,
      birthdate,
      size,
      team_id,
      status,
      gender,
      father_id,
    });

    // Devolver el nuevo jugador creado como respuesta JSON
    res.status(201).json(newPlayer);
  } catch (error) {
    // Si hay algún error, devolver un error al cliente
    res
      .status(500)
      .json({ message: "Error al crear el jugador", error: error.message });
  }
};