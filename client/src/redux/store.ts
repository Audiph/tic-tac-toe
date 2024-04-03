import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './gameSlice';
import { utilSlice } from './utilSlice';

const rootReducer = combineReducers({
  util: utilSlice.reducer,
  game: gameSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
