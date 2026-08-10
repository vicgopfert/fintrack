import { createBrowserRouter } from 'react-router';

import App from '@/App';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import NotFoundPage from '@/pages/NotFound';
import RegisterPage from '@/pages/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
