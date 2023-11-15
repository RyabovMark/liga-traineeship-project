import React, { ChangeEventHandler } from 'react';
import { TextField } from '@mui/material';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SearchInputProps } from './SearchInput.types';
import { ISearchSubmitForm } from 'types/react-hook-form';

export const SearchInput = ({ onChange, value }: SearchInputProps): JSX.Element => {
  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue('search', e.target.value);
    onChange(e.target.value);
  };

  const validationSchema = Yup.object().shape({
    search: Yup.string().max(7, 'Search must not exceed 7 characters'),
  });

  const { control, setValue } = useForm<ISearchSubmitForm>({
    defaultValues: {
      search: value,
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <Controller
      control={control}
      name="search"
      render={({ field, fieldState: { error } }) => (
        <TextField
          error={!!error}
          size="small"
          color="secondary"
          value={field.value}
          onChange={onSearchInputChange}
          label="Search..."
          variant="outlined"
        />
      )}
    />
  );
};
