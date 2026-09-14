import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
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

const getEditTransactionFormDefaultValues = (transaction) => ({
  name: transaction?.name,
  amount: parseFloat(transaction?.amount),
  date: new Date(transaction?.date),
  type: transaction?.type,
});

export const useEditTransactionForm = ({ transaction, onSuccess }) => {
  const { mutateAsync: editTransaction, isPending } = useEditTransaction();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editTransactionFormSchema),

    defaultValues: getEditTransactionFormDefaultValues(transaction),
  });

  useEffect(() => {
    reset(getEditTransactionFormDefaultValues(transaction));
  }, [transaction, reset]);

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
