import { createContext, useContext, useEffect, useState } from 'react';

import { useLogin } from '@/hook/data/use-login';
import { useRegister } from '@/hook/data/use-register';
import { clearTokens, getTokens, setTokens } from '@/lib/auth-tokens';
import { api } from '@/lib/axios';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  register: () => {},
  isPending: false,
  isInitializing: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const { mutateAsync: registerUser, isPending: isRegisterPending } =
    useRegister();
  const { mutateAsync: loginUser, isPending: isLoginPending } = useLogin();

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true);
        const { accessToken, refreshToken } = getTokens();
        if (!accessToken && !refreshToken) return;
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch (error) {
        setUser(null);
        clearTokens();
        console.error('Erro ao restaurar a sessão:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, []);

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
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
