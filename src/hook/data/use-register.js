import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from '@/lib/axios';

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],

    mutationFn: async (data) => {
      const { data: createdUser } = await api.post('/users', {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      });
      return createdUser;
    },

    onSuccess: (createdUser) => {
      const accessToken = createdUser.tokens.accessToken;
      const refreshToken = createdUser.tokens.refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log('Usuário registrado com sucesso:', createdUser);
      toast.success('Conta criada com sucesso! Você já pode fazer login.');
    },

    onError: (error) => {
      console.error('Erro ao registrar usuário:', {
        status: error.response?.status,
        data: error.response?.data,
      });

      toast.error('Erro ao criar conta. Por favor, tente novamente.');
    },
  });
};
