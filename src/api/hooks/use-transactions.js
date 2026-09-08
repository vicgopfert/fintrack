import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TransactionService } from '@/api/services/transaction';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-transaction'],

    mutationFn: TransactionService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      toast.success('Transação adicionada com sucesso!');
    },

    onError: (error) => {
      console.error('Erro ao criar transação:', {
        status: error.response?.status,
        data: error.response?.data,
      });
      toast.error('Erro ao adicionar transação. Por favor, tente novamente.');
    },
  });
};
