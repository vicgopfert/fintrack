import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldError,
  Input,
  PasswordInput,
} from '@/components';
import { useRegister } from '@/hook/data/use-register';
import { api } from '@/lib/axios';

const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, 'O nome é obrigatório'),
    lastName: z.string().trim().min(1, 'O sobrenome é obrigatório'),
    email: z.email('E-mail inválido'),
    password: z
      .string()
      .trim()
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z
      .string()
      .trim()
      .min(6, 'A confirmação de senha é obrigatória'),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Você deve aceitar os termos de serviço',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

const RegisterPage = () => {
  const { mutate: registerUser, isPending } = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
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

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken && !refreshToken) return;
        await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        navigate('/');
      } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.error('Error initializing registration page:', error);
      }
    };

    init();
  }, [navigate]);

  const onSubmit = (data) => {
    const { firstName, lastName, email, password } = data;
    registerUser({ firstName, lastName, email, password });
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-4 py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <Card className="w-full gap-7 border-0 bg-transparent py-0 shadow-none ring-0">
          <CardHeader className="items-center gap-2 px-0 text-center">
            <CardTitle className="text-2xl font-bold">
              Crie a sua conta
            </CardTitle>
            <CardDescription>
              Insira suas informações para se registrar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-0">
            <Field>
              <Input
                placeholder="Digite seu nome"
                aria-invalid={!!errors.firstName}
                disabled={isPending}
                {...register('firstName')}
              />
              <FieldError>{errors.firstName?.message}</FieldError>
            </Field>

            <Field>
              <Input
                placeholder="Digite seu sobrenome"
                aria-invalid={!!errors.lastName}
                disabled={isPending}
                {...register('lastName')}
              />
              <FieldError>{errors.lastName?.message}</FieldError>
            </Field>

            <Field>
              <Input
                placeholder="Digite seu e-mail"
                aria-invalid={!!errors.email}
                disabled={isPending}
                {...register('email')}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            <Field>
              <PasswordInput
                aria-invalid={!!errors.password}
                disabled={isPending}
                {...register('password')}
              />
              <FieldError>{errors.password?.message}</FieldError>
            </Field>

            <Field>
              <PasswordInput
                placeholder="Confirme sua senha"
                aria-invalid={!!errors.confirmPassword}
                disabled={isPending}
                {...register('confirmPassword')}
              />
              <FieldError>{errors.confirmPassword?.message}</FieldError>
            </Field>

            <Field>
              <div className="flex items-start gap-3 pt-1">
                <Controller
                  control={control}
                  name="terms"
                  render={({ field }) => (
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      aria-invalid={!!errors.terms}
                      disabled={isPending}
                    />
                  )}
                />
                <div className="grid gap-1 leading-relaxed">
                  <label
                    htmlFor="terms"
                    className="text-xs text-muted-foreground opacity-75"
                  >
                    Ao clicar em &quot;Criar conta&quot;, você concorda com os
                    nossos{' '}
                    <Link
                      to="/terms"
                      className="text-primary underline underline-offset-4 hover:text-primary/80"
                      disabled={isPending}
                    >
                      Termos de Serviço
                    </Link>{' '}
                    e{' '}
                    <Link
                      to="/privacy"
                      className="text-primary underline underline-offset-4 hover:text-primary/80"
                      disabled={isPending}
                    >
                      Política de Privacidade
                    </Link>
                    .
                  </label>
                </div>
              </div>
              <FieldError>{errors.terms?.message}</FieldError>
            </Field>
          </CardContent>
          <CardFooter className="border-t-0 bg-transparent p-0">
            <Button
              type="submit"
              className="h-11 w-full cursor-pointer text-sm font-semibold"
              disabled={isPending}
            >
              Criar conta
            </Button>
          </CardFooter>
        </Card>
      </form>

      <div className="flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Já possui uma conta?
          <Button
            variant="link"
            className="h-auto cursor-pointer px-1 py-0 font-semibold"
            disabled={isPending}
            asChild
          >
            <Link to="/login">Faça login</Link>
          </Button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
