import Player from "../models/player.model.js";

export const getAllPlayersCtlr = async (req, res) => {
  try {    
    // Consulta todos los jugadores y popula los campos "team" y "membership_payments"
    const players = await Player.find({})
      .populate('team', 'name')
      .populate({
        path: 'membership_payments',  // Poblamos el campo 'membership_payments'
        select: '_id annual_payment first_payment second_payment third_payment createdAt',  // Selecciona los campos necesarios de 'membership_payments'
      });
    // Devuelve los jugadores encontrados como respuesta JSON
    res.json(players);
  } catch (error) {
    // Si hay algún error, devuelve un error al cliente
    res.status(500).json({ message: "Error al obtener jugadores", error: error.message });
  }
};
export const getPlayerByIdCtlr = async (req, res) => {
  try {
    // Obtener el ID del jugador desde los parámetros de la solicitud
    const playerId = req.params.id;
    // Consultar el jugador por su ID en la base de datos y popula el campo "team" con el nombre del equipo
    const player = await Player.findById(playerId).populate('team', 'name').exec();
    // Verificar si se encontró el jugador
    if (!player) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }
    // Devolver el jugador encontrado como respuesta JSON
    res.json(player);
  } catch (error) {
    // Si hay algún error, devolver un error al cliente
    res.status(500).json({ message: "Error al obtener el jugador", error: error.message });
  }
};
export const deletePlayerCtlr = async (req, res) => {
  try {
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
