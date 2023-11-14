import React from 'react';
import './Select.css';
import { FormControl, InputLabel, MenuItem, Select as Selector } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setFilter } from '../../../../slices/todo/todoSlice';
import { SelectProps } from 'pages/TasksList/components/Select/Select.types';

export const Select = ({ headers }: SelectProps): JSX.Element => {
  const filter = useAppSelector((state) => state.todo.filter);
  const dispatch = useAppDispatch();

  const handleChange: SelectProps[onChange] = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <FormControl sx={{ maxWidth: 150 }}>
      <InputLabel id="select">Age</InputLabel>
      <Selector
        labelId="select"
        id="demo-simple-select-helper"
        value={filter}
        label="Select a filter"
        size="small"
        color="secondary"
        onChange={handleChange}>
        {headers.map((title) => (
          <MenuItem key={title.id} value={title.title}>
            {title.title}
          </MenuItem>
        ))}
      </Selector>
    </FormControl>
  );
};
