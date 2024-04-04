import { Express } from 'express';
import { gamesController } from '../controllers/games.server.controller';

export default class GamesRouter {
  constructor(app: Express) {
    app.get('/api/v1/:id', gamesController.getGameById);
    app.get('/api/v1/games', gamesController.getAllGames);
    app.post('/api/v1/game', gamesController.createGame);
    app.delete('/api/v1/game', gamesController.deleteGame);
  }
}
