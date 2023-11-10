import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todo/todoSlice';
import errorReducer from './slices/errorSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    error: errorReducer,
  },
});
