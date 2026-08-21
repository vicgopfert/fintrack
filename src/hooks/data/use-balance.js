import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

import { useAuthContext } from '@/contexts/auth';
import { UserService } from '@/services/user';

export const useBalance = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuthContext();

  const from = searchParams.get('from');
  const to = searchParams.get('to');

  return useQuery({
    queryKey: ['balance', user?.id, from, to],

    queryFn: () => UserService.getBalance({ from, to }),

    enabled: !!user?.id && !!from && !!to,

    meta: { errorMessage: 'Erro ao buscar o resumo financeiro.' },
  });
};
