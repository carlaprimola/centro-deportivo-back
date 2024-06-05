import { Router } from "express";
//import { authRequired } from "../middlewares/validateToken.js";
import { getPlayersCtlr, getPlayerByIdCtlr, deletePlayerCtrl, updatePlayerCtrl } from "../controllers/players.controller.js";

// import { validateSchema } from "../middlewares/validator.middleware.js";

const PlayerRouter = Router();

PlayerRouter.get("/", getPlayersCtlr)
  .get("/player/:id", getPlayerByIdCtlr)

  .delete("/player/:id", deletePlayerCtrl)
  .put("/player/:id", updatePlayerCtrl);

export default PlayerRouter;
