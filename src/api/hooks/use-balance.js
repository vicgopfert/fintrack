import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

import { queryKeys } from '@/api/queries/query-keys';
import { UserService } from '@/api/services/user';
import { useAuthContext } from '@/contexts/auth';

export const useBalance = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuthContext();

  const from = searchParams.get('from');
  const to = searchParams.get('to');

  return useQuery({
    queryKey: queryKeys.balance.period(user?.id, from, to),

    queryFn: () => UserService.getBalance({ from, to }),

    staleTime: 1000 * 60 * 5,

    enabled: !!user?.id && !!from && !!to,

    meta: { errorMessage: 'Erro ao buscar o resumo financeiro.' },
  });
};
