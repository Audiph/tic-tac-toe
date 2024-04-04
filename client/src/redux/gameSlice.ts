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
  },
  reducers: {
    setGames: (state: GameState, action: PayloadAction<GameState['games']>) => {
      state.games = action.payload;
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

export const { setGames } = gameSlice.actions;
