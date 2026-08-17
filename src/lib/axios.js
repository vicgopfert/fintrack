import axios from 'axios';

import { clearTokens, getTokens, setTokens } from '@/lib/auth-tokens';

export const publicApi = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const protectedApi = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

protectedApi.interceptors.request.use((request) => {
  const { accessToken } = getTokens();

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const { refreshToken } = getTokens();

    if (error.response?.status === 401 && refreshToken && !request._retry) {
      request._retry = true;

      try {
        const response = await publicApi.post('/auth/refresh-token', {
          refreshToken,
        });
        setTokens(response.data.tokens);
        return protectedApi.request(request);
      } catch (refreshError) {
        clearTokens();
        console.error('Erro ao atualizar o token de acesso:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);
