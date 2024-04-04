import { Request, Response } from 'express';

import { Games, GamesInput, GamesSchema } from '../models/games.model';

export default class GamesController {
  public async getAllGames(_: Request, res: Response) {
    try {
      const games = await Games.find();
      res.status(200).send({
        games,
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Error fetching games.', error, success: false });
    }
  }

  public async getGameById(req: Request, res: Response) {
    try {
      const game = await Games.findById(req.params.id)
        .then((result) => result)
        .catch((err) => {
          return res
            .status(404)
            .send({ message: 'Game not found.', err, success: false });
        });

      res.status(200).send({ game, success: true });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Error fetching game.', error, success: false });
    }
  }

  public async deleteGame(req: Request, res: Response) {
    try {
      const game = await Games.findByIdAndDelete(req.params.id)
        .then((result) => result)
        .catch((err) => {
          return res
            .status(404)
            .send({ message: 'Game not found.', err, success: false });
        });

      res.status(200).send({ game, success: true });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Error updating game.', error, success: false });
    }
  }

  public async createGame(req: Request, res: Response) {
    try {
      const { playerOne, playerTwo }: GamesInput = req.body;

      const newGame = new Games(req.body);

      const game = await newGame.save();

      res.status(201).send({
        message: `New Game created for ${playerOne} and ${playerTwo}`,
        game,
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Error creating match.', error, success: false });
    }
  }

  public async updateGame(req: Request, res: Response) {
    try {
      const { playerOne, playerTwo }: GamesInput = req.body;

      const updatedGame = await Games.findByIdAndUpdate(
        req.params.id,
        req.body
      );
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Error updating match.', error, success: false });
    }
  }
}

export const gamesController = new GamesController();
