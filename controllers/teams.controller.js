import Player from '../models/player.model.js';
import Team from '../models/teams.model.js';

const assignTeamToPlayer = async (req, res) => {
  const { playerId, teamId } = req.body;

  try {
    // Verificar si el jugador existe
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Verificar si el equipo existe
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Asignar el equipo al jugador
    player.team = team._id;
    await player.save();

    res.status(200).json({ message: "Team assigned to player successfully", player });
  } catch (error) {
    res.status(500).json({ message: "Error assigning team to player", error });
  }
};

const getSingleTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team", error });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error });
  }
};

export { assignTeamToPlayer, getSingleTeam, getAllTeams };
