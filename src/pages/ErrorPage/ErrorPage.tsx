import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('..'), 5000);
  }, []);

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #fff1eb, #ACE0D5)',
        width: '100vw',
        height: '100vh',
      }}>
      <Typography variant="h4" component="h4">
        An unexpected error occurred. You will be returned to the main page
      </Typography>
    </Box>
  );
};
