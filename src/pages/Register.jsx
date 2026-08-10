import { Link } from 'react-router';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  PasswordInput,
} from '@/components';

const RegisterPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>
            Insira suas informações para se registrar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu email" />
          <PasswordInput />
          <PasswordInput placeholder="Confirme sua senha" />
          <div className="items-top flex space-x-2">
            <Checkbox id="terms" />
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
        </CardContent>
        <CardFooter>
          <Button className="w-full cursor-pointer">Criar conta</Button>
        </CardFooter>
      </Card>

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
