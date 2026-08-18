import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { UserService } from '@/services/user';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],

    mutationFn: UserService.login,

    onSuccess: (loggedUser) => {
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
