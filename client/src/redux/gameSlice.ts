import { Score } from '@/lib/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GameState = {
  games: Array<Score>;
  game: Score | null;
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    games: [
      {
        id: 'asdawdad',
        playerOne: 'John',
        playerTwo: 'Jane',
        playerOneScore: 3,
        playerTwoScore: 2,
        draws: 4,
      },
      {
        id: 'testadawd',
        playerOne: 'Mecca',
        playerTwo: 'Jeff',
        playerOneScore: 4,
        playerTwoScore: 1,
        draws: 9,
      },
    ],
    game: null,
  },
  reducers: {
    setGames: (state, action: PayloadAction<GameState['games']>) => {
      state.games = action.payload;
    },
  },
});

export const { setGames } = gameSlice.actions;
