import Player from "../models/player.model.js";

export const getPlayersCtlr = async (req, res) => {
  try {
    console.log("Entrando en getPlayersCtlr"); 
    // Consulta todos los usuarios en la base de datos
    const players = await Player.find({});

    console.log("Datos de jugadores obtenidos:", players);

    // Devuelve los usuarios encontrados como respuesta JSON
    res.json(players);
  } catch (error) {
    // Si hay algún error, devuelve un error al cliente
    res
      .status(500)
      .json({ message: "Error al obtener jugadores", error: error.message });
  }
};

export const getPlayerByIdCtlr = async (req, res) => {
  try {
    console.log("Entrando en player controller getPlayerByIdCtrl");

    // Obtener el ID del jugador desde los parámetros de la solicitud
    const playerId = req.params.id;

    // Consultar el jugador por su ID en la base de datos
    const player = await Player.findById(playerId);

    // Verificar si se encontró el jugador
    if (!player) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }

    // Devolver el jugador encontrado como respuesta JSON
    res.json(player);
  } catch (error) {
    // Si hay algún error, devolver un error al cliente
    res
      .status(500)
      .json({ message: "Error al obtener el jugador", error: error.message });
  }
};

export const createPlayerCtrl = async (req, res) => {
   try {
     console.log("Entrando en player controller createPlayerCtrl");

     // Obtener los datos del jugador del cuerpo de la solicitud
     const {
       name,
       lastname,
       birthdate,
       size,
       team_id,
       status,
       gender,
       father_id,
     } = req.body;

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
export const deletePlayerCtrl = async (req, res) => {
  try {
    console.log("Entrando en player controller deletePlayerCtrl");

    // Obtener el ID del jugador desde los parámetros de la solicitud
    const playerId = req.params.id;

    // Buscar y eliminar el jugador por su ID en la base de datos
    const deletedPlayer = await Player.findByIdAndDelete(playerId);

    // Verificar si se encontró y eliminó el jugador
    if (!deletedPlayer) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }

    // Devolver el jugador eliminado como respuesta JSON
    res.json(deletedPlayer);
  } catch (error) {
    // Si hay algún error, devolver un error al cliente
    res
      .status(500)
      .json({ message: "Error al eliminar el jugador", error: error.message });
  }
};
export const updatePlayerCtrl = async (req, res) => {
  try {
    console.log("Entrando en player controller updatePlayerCtrl");

    // Obtener el ID del jugador desde los parámetros de la solicitud
    const playerId = req.params.id;

    // Obtener los nuevos datos del jugador del cuerpo de la solicitud
    const {
      name,
      lastname,
      birthdate,
      size,
      team_id,
      status,
      gender,
      father_id,
    } = req.body;

    // Buscar y actualizar el jugador por su ID en la base de datos
    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      {
        name,
        lastname,
        birthdate,
        size,
        team_id,
        status,
        gender,
        father_id,
      },
      { new: true }
    );

    // Verificar si se encontró y actualizó el jugador
    if (!updatedPlayer) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }

    // Devolver el jugador actualizado como respuesta JSON
    res.json(updatedPlayer);
  } catch (error) {
    // Si hay algún error, devolver un error al cliente
    res
      .status(500)
      .json({
        message: "Error al actualizar el jugador",
        error: error.message,
      });
  }
};
