import { model, Schema } from 'mongoose';
export let GamesSchema = new Schema({
    playerOne: {
        type: Schema.Types.String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    playerTwo: {
        type: Schema.Types.String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    playerOneScore: {
        type: Schema.Types.Number,
        default: 0,
    },
    playerTwoScore: {
        type: Schema.Types.Number,
        default: 0,
    },
    draws: {
        type: Schema.Types.Number,
        default: 0,
    },
    rounds: {
        type: Schema.Types.Number,
        default: 1,
    },
});
export const Games = model('games', GamesSchema);
//# sourceMappingURL=games.model.js.map