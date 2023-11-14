import React, { ChangeEventHandler } from 'react';
import { TextField } from '@mui/material';
import { SearchInputProps } from './SearchInput.types';

export const SearchInput = ({ onChange, value }: SearchInputProps): JSX.Element => {
  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      size="small"
      color="secondary"
      value={value}
      onChange={onSearchInputChange}
      label="Search..."
      variant="outlined"
    />
  );
};
