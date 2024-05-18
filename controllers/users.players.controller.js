import Player from "../models/player.model.js";

export const getMyPlayers = async (req, res) => {
  try {
    console.log("Entrando en mis players");
    
    // Supongamos que `req.userId` contiene el ID del usuario autenticado
    const userId = req.user._id;
    
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
      gender,
      allergies,
      injuryOrIllness,
      shirtSize,
      pantsSize,
      shoeSize
    } = req.body;

     //Aquí relaciono el id del representante 
     const parent_id = req.user._id;

    // Crear un nuevo jugador en la base de datos
    const newPlayer = await Player.create({
      name,
      lastname,
      birthdate,
      parent_id,
      //team_id,
      gender,
      allergies,
      injuryOrIllness,
      shirtSize,
      pantsSize,
      shoeSize
    });

    res.status(201).json(newPlayer);
  } catch (error) {
    
    res.status(500).json({ message: "Error al crear el jugador", error: error.message });
  }
};