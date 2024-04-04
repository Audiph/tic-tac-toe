import { createSlice } from '@reduxjs/toolkit';

export const utilSlice = createSlice({
  name: 'util',
  initialState: {
    loading: false,
    alert: false,
    confetti: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },

    hideLoading: (state) => {
      state.loading = false;
    },
    showAlert: (state) => {
      state.alert = true;
    },

    hideAlert: (state) => {
      state.alert = false;
    },
    showConfetti: (state) => {
      state.confetti = true;
    },

    hideConfetti: (state) => {
      state.confetti = false;
    },
  },
});

export const {
  showLoading,
  hideLoading,
  showAlert,
  hideAlert,
  showConfetti,
  hideConfetti,
} = utilSlice.actions;
