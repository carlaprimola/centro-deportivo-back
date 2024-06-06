import express from 'express';
import { assignTeamToPlayer } from '../controllers/teams.controller.js';
import { getSingleTeam, getAllTeams } from '../controllers/teams.controller.js';

const router = express.Router();

router.post('/assign-team', assignTeamToPlayer);
router.get('/team/:id', getSingleTeam);
router.get('/teams', getAllTeams);

export default router;
