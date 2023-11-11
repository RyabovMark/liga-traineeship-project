import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICollection, SetTaskPayload, SetTasksPayload, ToggleLoadingsPayload } from 'types/redux';

const state: ICollection = {
  collection: {
    'All task': [],
    'Done': [],
    'Not Done': [],
    'Important tasks': [],
    'Not important tasks': [],
    'By name': [],
    'Find one': {},
  },
  loadings: {
    'All task': false,
    'Done': false,
    'Not Done': false,
    'Important tasks': false,
    'Not important tasks': false,
    'By name': false,
    'Find one': false,
  },
  popupLoading: false,
};

export const todoSlice = createSlice({
  name: 'tasks',
  initialState: state,
  reducers: {
    setTasks: (state, { payload: { data, field } }: PayloadAction<SetTasksPayload>) => {
      state.collection[field] = data;
    },
    setTask: (state, { payload: { data } }: PayloadAction<SetTaskPayload>) => {
      state.collection['Find one'] = data;
    },
    toggleLoading: (state, { payload: { value, field } }: PayloadAction<ToggleLoadingsPayload>) => {
      state.loadings[field] = value;
    },
    setPopupLoading: (state, action: PayloadAction<boolean>) => {
      state.popupLoading = action.payload;
    },
  },
});

export const { setTasks, setTask, toggleLoading, setPopupLoading } = todoSlice.actions;
export default todoSlice.reducer;
