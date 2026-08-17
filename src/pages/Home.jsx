import { Button } from '@/components';
import { useAuthContext } from '@/contexts/auth';

const HomePage = () => {
  const { user, logout } = useAuthContext();

  return (
    <>
      <h1 className="text-2xl font-bold text-sky-600">Finance Tracker</h1>
      <p>Olá, {user.first_name}</p>
      <Button onClick={logout}>Sair</Button>
    </>
  );
};

export default HomePage;
