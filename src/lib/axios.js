import axios from 'axios';

import { getTokens } from '@/lib/auth-tokens';

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
