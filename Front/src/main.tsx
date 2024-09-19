import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './adapters/auth/Auth.tsx';
import { AppRoutes } from './router/AppRoutes.tsx';
import './index.css';
import { setupAxios } from './adapters/auth/AuthHelper.tsx';
import axios from 'axios';

setupAxios(axios);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <StrictMode>
        <AppRoutes />
      </StrictMode>
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
