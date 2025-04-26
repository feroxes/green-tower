import axios from 'axios';
import { getAccessTokenMemory, setAccessTokenMemory } from '../context/auth-context/auth-store';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getAccessTokenMemory();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    const newAccess = response.headers['new-access-token'] as string | undefined;
    if (newAccess) {
      const token = newAccess.startsWith('Bearer ') ? newAccess.slice(7) : newAccess;
      setAccessTokenMemory(token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
