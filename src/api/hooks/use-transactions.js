import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';

import { mutationKeys, queryKeys } from '@/api/queries/query-keys';
import { TransactionService } from '@/api/services/transaction';
import { useAuthContext } from '@/contexts/auth';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.createTransaction,

    mutationFn: TransactionService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.balance.all });
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

export const useGetTransactions = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuthContext();

  const from = searchParams.get('from');
  const to = searchParams.get('to');

  return useQuery({
    queryKey: queryKeys.transactions.period(user?.id, from, to),

    queryFn: () => TransactionService.getAll({ from, to }),

    staleTime: 1000 * 60 * 5,

    enabled: !!user?.id && !!from && !!to,

    meta: { errorMessage: 'Erro ao buscar as transações.' },
  });
};
