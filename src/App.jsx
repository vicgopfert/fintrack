import { Outlet } from 'react-router';

import { Toaster } from '@/components/ui/sonner';
import { AuthContextProvider } from '@/contexts/auth';

const App = () => {
  return (
    <AuthContextProvider>
      <Outlet />
      <Toaster />
    </AuthContextProvider>
  );
};

export default App;
