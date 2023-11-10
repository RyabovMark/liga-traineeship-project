import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: string | null } = { value: null };

export const errorsSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.value = action.payload.message;
    },
    unsetError: (state) => {
      state.value = null;
    },
  },
});

export const { setError, unsetError } = errorsSlice.actions;

export default errorsSlice.reducer;
