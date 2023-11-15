import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import todoReducer from './slices/todo/todoSlice';
import errorReducer from './slices/errorSlice';

const logger = createLogger({ collapsed: true });

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    error: errorReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
// console.log(store.getState());
