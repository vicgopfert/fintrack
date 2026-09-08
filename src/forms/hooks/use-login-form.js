import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAuthContext } from '@/contexts/auth';

import { loginFormSchema } from '../schemas/login';

export const useLoginForm = () => {
  const { login, isPending } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: 'onSubmit',

    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    login({ email, password });
  };

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
  };
};
