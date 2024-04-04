import { Express } from 'express';
import { gamesController } from '../controllers/games.server.controller';

export default class GamesRouter {
  constructor(app: Express) {
    app.get('/', gamesController.getAllGames);
    app.post('/', gamesController.createGame);
  }
}
