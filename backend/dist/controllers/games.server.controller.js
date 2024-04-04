import { Games } from '../models/games.model';
export default class GamesController {
    async getAllGames(_, res) {
        try {
            const games = await Games.find();
            res.status(200).send({
                games,
                success: true,
            });
        }
        catch (error) {
            res
                .status(500)
                .send({ message: 'Error fetching games.', error, success: false });
        }
    }
    async getGameById(req, res) {
        try {
            const game = await Games.findById(req.params.id)
                .then((result) => result)
                .catch((err) => {
                return res
                    .status(404)
                    .send({ message: 'Game not found.', err, success: false });
            });
            res.status(200).send({ game, success: true });
        }
        catch (error) {
            res
                .status(500)
                .send({ message: 'Error fetching game.', error, success: false });
        }
    }
    async deleteGame(req, res) {
        try {
            const game = await Games.findByIdAndDelete(req.params.id)
                .then((result) => result)
                .catch((err) => {
                return res
                    .status(404)
                    .send({ message: 'Game not found.', err, success: false });
            });
            res.status(200).send({ game, success: true });
        }
        catch (error) {
            res
                .status(500)
                .send({ message: 'Error updating game.', error, success: false });
        }
    }
    async createGame(req, res) {
        try {
            const { playerOne, playerTwo } = req.body;
            const newGame = new Games(req.body);
            const game = await newGame.save();
            res.status(201).send({
                message: `New Game created for ${playerOne} and ${playerTwo}`,
                game,
                success: true,
            });
        }
        catch (error) {
            res
                .status(500)
                .send({ message: 'Error creating match.', error, success: false });
        }
    }
    async updateGame(req, res) {
        try {
            const { playerOne, playerTwo } = req.body;
            const updatedGame = await Games.findByIdAndUpdate(req.params.id, req.body);
        }
        catch (error) {
            res
                .status(500)
                .send({ message: 'Error updating match.', error, success: false });
        }
    }
}
export const gamesController = new GamesController();
//# sourceMappingURL=games.server.controller.js.map