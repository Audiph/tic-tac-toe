import { Request, Response } from 'express';

import { Games, GamesInput, GamesSchema } from '../models/games.model';

export default class GamesController {
  public async getAllGames(_: Request, res: Response) {
    try {
      const games = await Games.find();
      res.status(200).send({
        games,
      });
    } catch (error) {
      res.status(500).send({ message: 'Error fetching games.', error });
    }
  }

  public async getGameById(req: Request, res: Response) {
    try {
      const game = await Games.findById(req.params.id)
        .then((result) => result)
        .catch((err) => {
          return res.status(404).send({ message: 'Game not found.', err });
        });

      res.status(200).send({ game });
    } catch (error) {
      res.status(500).send({ message: 'Error fetching game.', error });
    }
  }

  public async deleteGame(req: Request, res: Response) {
    try {
      const game = await Games.findByIdAndDelete(req.params.id)
        .then((result) => result)
        .catch((err) => {
          return res.status(404).send({ message: 'Game not found.', err });
        });

      res.status(200).send({ game });
    } catch (error) {
      res.status(500).send({ message: 'Error updating game.', error });
    }
  }

  public async createGame(req: Request, res: Response) {
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
