import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  useCreateTransaction,
  useEditTransaction,
} from '@/api/hooks/use-transactions';

import {
  createTransactionFormSchema,
  editTransactionFormSchema,
} from '../schemas/transaction';

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

export const useEditTransactionForm = ({ transaction, onSuccess }) => {
  const { mutateAsync: editTransaction, isPending } = useEditTransaction();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editTransactionFormSchema),

    defaultValues: {
      id: transaction?.id,
      name: transaction?.name,
      amount: parseFloat(transaction?.amount),
      date: transaction?.date,
      type: transaction?.type,
    },
  });

  const onSubmit = async (data) => {
    try {
      await editTransaction(data);
      onSuccess();
    } catch {
      // Erro reportado pelo onError do useEditTransaction.
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
