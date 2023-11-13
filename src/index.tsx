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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
