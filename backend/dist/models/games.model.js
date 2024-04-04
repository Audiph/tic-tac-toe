"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Games = exports.GamesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.GamesSchema = new mongoose_1.Schema({
    playerOne: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    playerTwo: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    playerOneScore: {
        type: mongoose_1.Schema.Types.Number,
        default: 0,
    },
    playerTwoScore: {
        type: mongoose_1.Schema.Types.Number,
        default: 0,
    },
    draws: {
        type: mongoose_1.Schema.Types.Number,
        default: 0,
    },
    rounds: {
        type: mongoose_1.Schema.Types.Number,
        default: 1,
    },
});
exports.Games = (0, mongoose_1.model)('games', exports.GamesSchema);
//# sourceMappingURL=games.model.js.map