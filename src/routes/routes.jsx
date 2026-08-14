import { createBrowserRouter } from 'react-router';

import App from '@/App';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import NotFoundPage from '@/pages/NotFound';
import { ProtectedRoute, PublicRoute } from '@/routes';

import RegisterPage from '../pages/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [{ index: true, element: <HomePage /> }],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
