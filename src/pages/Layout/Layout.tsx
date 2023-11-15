import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './component/Header/Header';
import { Footer } from './component/Footer/Footer';
import './Layout.css';
import { Loader } from 'components/Loader';
import { NavButton } from 'components/NavButton/NavButton';

export const Layout = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('tasks_list', { replace: true });
    }
  }, [location]);

  return (
    <div className="container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
