import { Express } from 'express';
import { gamesController } from '../controllers/games.server.controller';

export default class GamesRouter {
  constructor(app: Express) {
    app.get('/api/v1/games', gamesController.getAllGames);
    app.post('/api/v1/game', gamesController.createGame);
    app.put('/api/v1/game/:id', gamesController.updateGame);
    app.delete('/api/v1/game/:id', gamesController.deleteGame);
    app.get('/api/v1/:id', gamesController.getGameById);
  }
}
