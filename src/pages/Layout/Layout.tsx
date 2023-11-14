import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './component/Header/Header';
import { Footer } from './component/Footer/Footer';
import './Layout.css';

export const Layout = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('tasks_list', { replace: true });
    }
  }, [location]);

  return (
    <Box component="div" className="container">
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
