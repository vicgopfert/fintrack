import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCreateTransaction } from '@/api/hooks/use-transactions';

import { createTransactionFormSchema } from '../schemas/transaction';

export const useCreateTransactionForm = ({ onSuccess }) => {
  const { mutateAsync: createTransaction, isPending } = useCreateTransaction();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTransactionFormSchema),

    defaultValues: {
      name: '',
      amount: undefined,
      date: new Date(),
      type: undefined,
    },
  });

  const onSubmit = async (data) => {
    try {
      await createTransaction(data);
      onSuccess();
    } catch {
      // Erro reportado pelo onError do useCreateTransaction.
    }
  };

  return {
    handleSubmit,
    control,
    reset,
    errors,
    isPending,
    onSubmit,
  };
};
