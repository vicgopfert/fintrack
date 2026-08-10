import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center gap-2 py-16">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="text-muted-foreground">Página não encontrada.</p>
      <Link to="/" className="underline">
        Voltar para o início
      </Link>
    </div>
  );
};

export default NotFoundPage;
