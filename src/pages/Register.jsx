import { Link } from 'react-router';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
