"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const games_server_controller_1 = require("../controllers/games.server.controller");
const router = express_1.default.Router();
router.get('/games', games_server_controller_1.getAllGames);
router.post('/game', games_server_controller_1.createGame);
router.put('/game/:id', games_server_controller_1.updateGame);
router.delete('/game/:id', games_server_controller_1.deleteGame);
router.get('/:id', games_server_controller_1.getGameById);
exports.default = router;
//# sourceMappingURL=games.server.route.js.map