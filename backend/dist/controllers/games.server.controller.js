"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGame = exports.createGame = exports.deleteGame = exports.getGameById = exports.getAllGames = void 0;
const games_model_1 = require("../models/games.model");
const getAllGames = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield games_model_1.Games.find();
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
});
exports.getAllGames = getAllGames;
const getGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield games_model_1.Games.findById(req.params.id)
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
});
exports.getGameById = getGameById;
const deleteGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield games_model_1.Games.findByIdAndDelete(req.params.id)
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
});
exports.deleteGame = deleteGame;
const createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerOne, playerTwo } = req.body;
        const newGame = new games_model_1.Games(req.body);
        const game = yield newGame.save();
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
});
exports.createGame = createGame;
const updateGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerOne, playerTwo } = req.body;
        const updatedGame = yield games_model_1.Games.findByIdAndUpdate(req.params.id, req.body);
    }
    catch (error) {
        res
            .status(500)
            .send({ message: 'Error updating match.', error, success: false });
    }
});
exports.updateGame = updateGame;
//# sourceMappingURL=games.server.controller.js.map