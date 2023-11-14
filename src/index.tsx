import React from 'react';
import './style.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Container } from 'pages/TasksList/Container';
import { TaskForm } from 'pages/TaskForm/TaskForm';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { Layout } from 'pages/Layout/Layout';
import { createTheme, ThemeProvider } from '@mui/system';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'tasks_list/',
        element: <Container />,
      },
      {
        path: 'task_form',
        element: <TaskForm />,
      },
      {
        path: 'task_form/:id',
        element: <TaskForm />,
      },
    ],
  },
]);

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 768,
      lg: 992,
      xl: 1280,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
);
