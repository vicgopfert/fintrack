import { Spinner } from '../ui/spinner';

const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Spinner className="size-8 text-muted-foreground" />
    </div>
  );
};

export default LoadingScreen;
