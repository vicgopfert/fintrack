import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';
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

const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, 'O nome é obrigatório'),
    lastName: z.string().trim().min(1, 'O sobrenome é obrigatório'),
    email: z.email('Email inválido'),
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
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
    console.log(data);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-96">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-2xl">Crie a sua conta</CardTitle>
            <CardDescription>
              Insira suas informações para se registrar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <Input
                placeholder="Digite seu nome"
                aria-invalid={!!errors.firstName}
                {...register('firstName')}
              />
              <FieldError>{errors.firstName?.message}</FieldError>
            </Field>

            <Field>
              <Input
                placeholder="Digite seu sobrenome"
                aria-invalid={!!errors.lastName}
                {...register('lastName')}
              />
              <FieldError>{errors.lastName?.message}</FieldError>
            </Field>

            <Field>
              <Input
                placeholder="Digite seu email"
                aria-invalid={!!errors.email}
                {...register('email')}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            <Field>
              <PasswordInput
                aria-invalid={!!errors.password}
                {...register('password')}
              />
              <FieldError>{errors.password?.message}</FieldError>
            </Field>

            <Field>
              <PasswordInput
                placeholder="Confirme sua senha"
                aria-invalid={!!errors.confirmPassword}
                {...register('confirmPassword')}
              />
              <FieldError>{errors.confirmPassword?.message}</FieldError>
            </Field>

            <Field>
              <div className="items-top flex space-x-2">
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
                    />
                  )}
                />
                <div className="5 grid gap-1 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-xs text-muted-foreground opacity-75"
                  >
                    Ao clicar em &quot;Criar conta&quot;, você concorda com os
                    nossos{' '}
                    <Link
                      to="/terms"
                      className="text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      Termos de Serviço
                    </Link>{' '}
                    e{' '}
                    <Link
                      to="/privacy"
                      className="text-primary underline underline-offset-4 hover:text-primary/80"
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
          <CardFooter>
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isSubmitting}
            >
              Criar conta
            </Button>
          </CardFooter>
        </Card>
      </form>

      <div className="flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Já possui uma conta?
          <Button variant="link" className="cursor-pointer" asChild>
            <Link to="/login">Faça login</Link>
          </Button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
