import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const RegisterPage = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

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
          <div className="relative">
            <Input
              type={passwordIsVisible ? 'text' : 'password'}
              placeholder="Digite sua senha"
            />

            <Button
              type="button"
              variant="ghost"
              className="absolute top-0 right-0 bottom-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
              onClick={() => setPasswordIsVisible(!passwordIsVisible)}
            >
              {passwordIsVisible ? <EyeClosed /> : <Eye />}
            </Button>
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
