import React from 'react';
import { Box, Typography } from '@mui/material';

export const Footer = (): JSX.Element => {
  return (
    <Box
      component="footer"
      sx={{
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Typography component="h6" variant="h6">
        Ryabov Mark, 2023
      </Typography>
    </Box>
  );
};
