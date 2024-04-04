import { Document, Model, model, Schema } from 'mongoose';

export interface Games extends Document {
  player_one: string;
  player_two: string;
  player_one_score: number;
  player_two_score: number;
  draws: number;
  rounds: number;
}

export type GamesInput = {
  player_one: string;
  player_two: string;
};

export let GamesSchema: Schema = new Schema({
  player_one: {
    type: Schema.Types.String,
    required: true,
  },

  player_two: {
    type: Schema.Types.String,
    required: true,
  },

  player_one_score: {
    type: Schema.Types.Number,
    default: 0,
  },

  player_two_score: {
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
