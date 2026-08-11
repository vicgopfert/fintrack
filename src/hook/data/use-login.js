import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from '@/lib/axios';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],

    mutationFn: async (data) => {
      const { data: loggedUser } = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      });
      return loggedUser;
    },

    onSuccess: (loggedUser) => {
      const accessToken = loggedUser.tokens.accessToken;
      const refreshToken = loggedUser.tokens.refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log('Usuário logado com sucesso:', loggedUser);
      toast.success('Login realizado com sucesso!');
    },

    onError: (error) => {
      console.error('Erro ao fazer login:', {
        status: error.response?.status,
        data: error.response?.data,
      });

      toast.error('Erro ao fazer login. Por favor, tente novamente.');
    },
  });
};
