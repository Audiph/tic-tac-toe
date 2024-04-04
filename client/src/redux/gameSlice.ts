import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, Score } from '@/lib/constants';
import { hideLoading, showLoading } from './utilSlice';

interface GameState {
  games: Array<Score>;
  game: Score | null;
  winner: string;
}

export const getAllGames = createAsyncThunk<Score[]>(
  'game/getAllGames',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const response = await axios.get(`${BASE_URL}/api/v1/games`);
      thunkAPI.dispatch(hideLoading());

      if (!response.data.success) {
        return [];
      }
      return response.data.games as Score[];
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue([]);
    }
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    games: [],
    game: null,
    winner: '',
  } as GameState,
  reducers: {
    setGames: (state: GameState, action: PayloadAction<GameState['games']>) => {
      state.games = action.payload;
    },

    setGame: (state: GameState, action: PayloadAction<GameState['game']>) => {
      state.game = action.payload;
    },

    setWinner: (
      state: GameState,
      action: PayloadAction<GameState['winner']>
    ) => {
      state.winner = action.payload;
    },

    incrementPlayerOneScore: (state: GameState) => {
      if (state.game) state.game.playerOneScore += 1;
    },

    incrementPlayerTwoScore: (state: GameState) => {
      if (state.game) state.game.playerTwoScore += 1;
    },

    incrementDraws: (state: GameState) => {
      if (state.game) state.game.draws += 1;
    },

    incrementRounds: (state: GameState) => {
      if (state.game) state.game.rounds += 1;
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<GameState>) => {
    builder.addCase(
      getAllGames.fulfilled,
      (state, action: PayloadAction<Score[]>) => {
        state.games = action.payload; // Ensure payload is not undefined
      }
    );
  },
});

export const {
  setGames,
  setGame,
  setWinner,
  incrementDraws,
  incrementPlayerOneScore,
  incrementPlayerTwoScore,
  incrementRounds,
} = gameSlice.actions;
