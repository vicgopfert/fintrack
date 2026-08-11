import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
  Field,
  FieldError,
  Input,
  PasswordInput,
} from '@/components';

const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().trim().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-4 py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <Card className="w-full gap-7 border-0 bg-transparent py-0 shadow-none ring-0">
          <CardHeader className="items-center gap-2 px-0 text-center">
            <CardTitle className="text-2xl font-bold">
              Entre na sua conta
            </CardTitle>
            <CardDescription>Insira seus dados abaixo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-0">
            <Field>
              <Input
                placeholder="Digite seu e-mail"
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
          </CardContent>
          <CardFooter className="border-t-0 bg-transparent p-0">
            <Button
              type="submit"
              className="h-11 w-full cursor-pointer text-sm font-semibold"
              disabled={isSubmitting}
            >
              Fazer login
            </Button>
          </CardFooter>
        </Card>
      </form>

      <div className="flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Ainda não possui uma conta?
          <Button
            variant="link"
            className="h-auto cursor-pointer px-1 py-0 font-semibold"
            asChild
          >
            <Link to="/register">Crie agora</Link>
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
