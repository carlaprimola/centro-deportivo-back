import Player from "../models/player.model.js";


export const getMyPlayers = async (req, res) => {
  try {
  
    //el ID y el nombre del usuario autenticado
    const userId = req.user._id;
    console.log(`Players del usuario ${userId}`);

    // Consulta solo los jugadores creados por el usuario autenticado por parent_id igual al ID del usuario autenticado
    const usersPlayers = await Player.find({ parent_id: userId }).populate('parent_id', 'name lastname');
    
    // Loguear el nombre del usuario creador
    usersPlayers.forEach(player => {
      console.log(`Jugador: ${player.name}, Creado por: ${player.parent_id.name} ${player.parent_id.lastname}`);
    });
    
    return res.status(200).json(usersPlayers);
  } catch (error) {
    console.error(`Error en getMyPlayers: ${error.message}`);
    res.status(500).json({ message: "Error al obtener los jugadores" });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const {
      name,
      lastname,
      birthdate,
      email,
      dni,
      phone,
      post_code,
      allergies,
      injury_illness,
      shirt_size,
      pants_size,
      shoe_size
    } = req.body;

     //Aquí relaciono el id del representante 
     const parent_id = req.user._id;
    // Creando un nuevo jugador en la base de datos
    const newPlayer = await Player.create({
      name,
      lastname,
      birthdate,
      parent_id,
      email,
      dni,
      phone,
      post_code,
      allergies,
      injury_illness,
      shirt_size,
      pants_size,
      shoe_size
    });

    res.status(201).json(newPlayer);
  } catch (error) {
    
    res.status(500).json({ message: "Error al crear el jugador", error: error.message });
  }
};