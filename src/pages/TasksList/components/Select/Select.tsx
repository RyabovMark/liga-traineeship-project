import React from 'react';
import { FormControl, InputLabel, MenuItem, Select as Selector, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setCurrentPage, setFilter } from '../../../../slices/todo/todoSlice';
import { SelectProps } from 'pages/TasksList/components/Select/Select.types';
import { Fields } from 'types/redux';

export const Select = ({ headers }: SelectProps): JSX.Element => {
  const filter = useAppSelector((state) => state.todo.filter);
  const dispatch = useAppDispatch();

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(setCurrentPage(1));
    dispatch(setFilter(e.target.value as Fields));
  };

  return (
    <FormControl sx={{ width: 200, margin: '10px 0' }}>
      <InputLabel id="select">Set Filter</InputLabel>
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
