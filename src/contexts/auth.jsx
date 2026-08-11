import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useRegister } from '@/hook/data/use-register';
import { api } from '@/lib/axios';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  register: () => {},
  isPending: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { mutateAsync: registerUser, isPending } = useRegister();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken && !refreshToken) return;
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
        navigate('/');
      } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
        console.error('Erro ao restaurar a sessão:', error);
      }
    };

    init();
  }, [navigate]);

  const register = async (data) => {
    const { firstName, lastName, email, password } = data;

    const createdUser = await registerUser({
      firstName,
      lastName,
      email,
      password,
    });
    setUser(createdUser.user);
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{ user, login: () => {}, register, isPending }}
    >
      {children}
    </AuthContext.Provider>
  );
};
