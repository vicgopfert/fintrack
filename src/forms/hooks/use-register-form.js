import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAuthContext } from '@/contexts/auth';

import { registerFormSchema } from '../schemas/register';

export const useRegisterForm = () => {
  const { register: registerUser, isPending } = useAuthContext();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    mode: 'onSubmit',

    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = (data) => {
    const { firstName, lastName, email, password } = data;
    registerUser({ firstName, lastName, email, password });
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    isPending,
    onSubmit,
  };
};
