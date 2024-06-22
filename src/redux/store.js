// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './progressSlice';

export const store = configureStore({
  reducer: {
    progress: progressReducer,
  },
});

export default store;