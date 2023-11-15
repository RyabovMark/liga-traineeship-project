import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TasksList } from 'pages/TasksList/TasksList';
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
        element: <TasksList />,
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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
