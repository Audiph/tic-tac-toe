import { Request, Response } from 'express';

import { Games, GamesInput, GamesSchema } from '../models/games.model';

export default class GamesController {
  public getAllGames(req: Request, res: Response): void {
    res.status(200).send({ message: 'Hello Worlds!' });
  }

  public async createGame(req: Request, res: Response): Promise<void> {
    try {
      const { player_one, player_two }: GamesInput = req.body;

      const newGame = new Games(req.body);

      const game = await newGame.save();

      res.status(201).send({
        message: `New Game created for ${player_one} and ${player_two}`,
        game,
      });
    } catch (error) {
      res.status(500).send({ message: 'Error creating match.', error });
    }
  }
}

export const gamesController = new GamesController();
