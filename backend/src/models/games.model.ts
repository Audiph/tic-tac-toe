import { Document, Model, model, Schema } from 'mongoose';

export interface Games extends Document {
  playerOne: string;
  playerTwo: string;
  playerOneScore: number;
  playerTwoScore: number;
  draws: number;
  rounds: number;
}

export type GamesInput = {
  playerOne: string;
  playerTwo: string;
};

export let GamesSchema: Schema = new Schema({
  playerOne: {
    type: Schema.Types.String,
    required: true,
  },

  playerTwo: {
    type: Schema.Types.String,
    required: true,
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
    default: 0,
  },
});

export const Games: Model<Games> = model<Games>('games', GamesSchema);
