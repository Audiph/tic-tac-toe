import { createSlice } from '@reduxjs/toolkit';

export const utilSlice = createSlice({
  name: 'util',
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },

    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = utilSlice.actions;
