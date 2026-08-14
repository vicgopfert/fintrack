import { Navigate, Outlet } from 'react-router';

import { useAuthContext } from '@/contexts/auth';

import LoadingScreen from '../components/custom/loading-screen';

const ProtectedRoute = () => {
  const { user, isInitializing } = useAuthContext();

  if (isInitializing) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
