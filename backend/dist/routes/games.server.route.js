"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const games_server_controller_1 = require("../controllers/games.server.controller");
class GamesRouter {
    constructor(app) {
        app.get('/api/v1/games', games_server_controller_1.gamesController.getAllGames);
        app.post('/api/v1/game', games_server_controller_1.gamesController.createGame);
        app.put('/api/v1/game/:id', games_server_controller_1.gamesController.updateGame);
        app.delete('/api/v1/game/:id', games_server_controller_1.gamesController.deleteGame);
        app.get('/api/v1/:id', games_server_controller_1.gamesController.getGameById);
    }
}
exports.default = GamesRouter;
//# sourceMappingURL=games.server.route.js.map