import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { NavButtonProps } from 'components/NavButton/NavButton.types';

export const NavButton = ({ to, text, children }: NavButtonProps): JSX.Element => {
  return (
    <NavLink to={to}>
      <Button variant="contained" color="secondary" size="small" sx={{ fontSize: '16px' }}>
        {text}
        {children}
      </Button>
    </NavLink>
  );
};
