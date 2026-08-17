import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { publicApi } from '@/lib/axios';

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],

    mutationFn: async (data) => {
      const { data: createdUser } = await publicApi.post('/users', {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      });
      return createdUser;
    },

    onSuccess: (createdUser) => {
      console.log('Usuário registrado com sucesso:', createdUser);
      toast.success('Conta criada com sucesso!');
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
