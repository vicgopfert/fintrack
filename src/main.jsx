import './style.css';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { toast } from 'sonner';

import { router } from '@/routes/routes';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error('Erro na query:', {
        queryKey: query.queryKey,
        status: error.response?.status,
        data: error.response?.data,
      });

      if (query.meta?.errorMessage) {
        toast.error(query.meta.errorMessage);
      }
    },
  }),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
