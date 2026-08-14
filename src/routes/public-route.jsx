import { Navigate, Outlet } from 'react-router';

import { useAuthContext } from '@/contexts/auth';

import LoadingScreen from '../components/custom/loading-screen';

const PublicRoute = () => {
  const { user, isInitializing } = useAuthContext();

  if (isInitializing) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
