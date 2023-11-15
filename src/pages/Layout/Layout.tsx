import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Footer, Header } from './index';

export const Layout = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('tasks_list', { replace: true });
    }
  }, [location]);

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(45deg, #fff1eb, #ACE0D5)',
          minWidth: '320px',
          minHeight: '100vh',
        }}>
        <Header />
        <Box
          component="main"
          sx={{
            flex: '1 0 auto',
            overflow: 'hidden',
            maxHeight: 'calc(100vh - 140px)',
            maxWidth: 'lg',
          }}>
          <Outlet />
        </Box>
        <Footer />
      </Container>
    </>
  );
};
