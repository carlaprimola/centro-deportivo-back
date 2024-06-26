import Player from "../models/player.model.js";
import User from "../models/user.model.js";
import { emailNewPlayerNotification } from '../utils/sendEmail.js';

export const getMyPlayers = async (req, res) => {
  try {
    const userId = req.user._id;
       // Consulta solo los jugadores creados por el usuario autenticado por parent_id igual al ID del usuario autenticado
    const usersPlayers = await Player.find({ parent_id: userId }).populate('parent_id', 'name lastname').populate('team', 'name');
        res.status(200).json(usersPlayers);
  } catch (error) {
       res.status(500).json({ message: "Error al obtener los jugadores" });
  }
};
export const createPlayer = async (req, res) => {
  try {
    const {
      name,
      lastname,
      email,
      dni,
      phone,
      post_code,
      birthdate,
      age,
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
      parent_id,
      email,
      dni,
      phone,
      post_code,
      birthdate,
      age,
      allergies,
      injury_illness,
      shirt_size,
      pants_size,
      shoe_size
    });

   //Esto es para actualizar el usuario al crear jugadores
    await User.findByIdAndUpdate(parent_id, {$push: { players_id: newPlayer._id }});  
    //Para que aparezca el nombre del usuario en el email
    const user = await User.findById(parent_id);
    if (!user) {
      throw new Error('User not found');
    }
    // Para enviar la notificación por email
    await emailNewPlayerNotification(newPlayer, user);
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el jugador", error: error.message });
  }
};