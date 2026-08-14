import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useLogin } from '@/hook/data/use-login';
import { useRegister } from '@/hook/data/use-register';
import { clearTokens, getTokens, setTokens } from '@/lib/auth-tokens';
import { api } from '@/lib/axios';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  register: () => {},
  isPending: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { mutateAsync: registerUser, isPending: isRegisterPending } =
    useRegister();
  const { mutateAsync: loginUser, isPending: isLoginPending } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const { accessToken, refreshToken } = getTokens();
        if (!accessToken && !refreshToken) return;
        const response = await api.get('/users/me');
        setUser(response.data);
        navigate('/');
      } catch (error) {
        clearTokens();
        navigate('/login');
        console.error('Erro ao restaurar a sessão:', error);
      }
    };

    init();
  }, [navigate]);

  const register = async (data) => {
    const { firstName, lastName, email, password } = data;

    try {
      const createdUser = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });
      setUser(createdUser.user);
      setTokens(createdUser.tokens);
      navigate('/');
    } catch {
      // O erro já é reportado ao usuário pelo onError do useRegister.
    }
  };

  const login = async (data) => {
    const { email, password } = data;

    try {
      const loggedUser = await loginUser({ email, password });
      setUser(loggedUser);
      setTokens(loggedUser.tokens);
      navigate('/');
    } catch {
      // O erro já é reportado ao usuário pelo onError do useLogin.
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: login,
        register,
        isPending: isRegisterPending || isLoginPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
