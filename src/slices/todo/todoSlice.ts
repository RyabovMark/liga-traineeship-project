import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Fields, ICollection, SetTaskPayload, SetTasksPayload, ToggleLoadingsPayload } from 'types/redux';

const state: ICollection = {
  collection: {
    'All task': [],
    'Done': [],
    'Not done': [],
    'Important tasks': [],
    'Not important tasks': [],
    'By name': [],
    'Find one': {},
  },
  loadings: {
    'All task': false,
    'Done': false,
    'Not done': false,
    'Important tasks': false,
    'Not important tasks': false,
    'By name': false,
    'Find one': false,
  },
  popupLoading: false,
  filter: 'All task',
  searchBy: '',
};

export const todoSlice = createSlice({
  name: 'tasks',
  initialState: state,
  reducers: {
    setTasks: (state, { payload: { data, field } }: PayloadAction<SetTasksPayload>) => {
      state.collection[field] = data;
    },
    setTask: (state, { payload: { data } }: PayloadAction<SetTaskPayload>) => {
      state.collection['Find one'] = data || {};
    },
    toggleLoading: (state, { payload: { value, field } }: PayloadAction<ToggleLoadingsPayload>) => {
      state.loadings[field] = value;
    },
    setPopupLoading: (state, action: PayloadAction<boolean>) => {
      state.popupLoading = action.payload;
    },
    setFilter: (state, action: PayloadAction<Fields>) => {
      state.filter = action.payload;
    },
    setSearchBy: (state, action: PayloadAction<string>) => {
      state.searchBy = action.payload;
    },
  },
});

export const { setSearchBy, setFilter, setTasks, setTask, toggleLoading, setPopupLoading } = todoSlice.actions;
export default todoSlice.reducer;
