import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { UserService } from '@/services/user';

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],

    mutationFn: UserService.register,

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
