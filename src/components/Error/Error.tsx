import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { setError } from '../../slices/errorSlice';
import { IErrorProps } from 'components/Error/Error.types';

export const Error = ({ value }: IErrorProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setError(' '));
      navigate('..');
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Typography component="p" sx={{ color: 'red' }}>
      {value}
    </Typography>
  );
};
