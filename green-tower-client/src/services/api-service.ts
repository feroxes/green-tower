import axios from 'axios';
import { getAccessTokenMemory, setAccessTokenMemory } from '../store/auth-context/auth-store';

export const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 10000,
});

apiService.interceptors.request.use((config) => {
  const token = getAccessTokenMemory();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

apiService.interceptors.response.use(
  (response) => {
    const newAccess = response.headers['new-access-token'] as string | undefined;
    if (newAccess) {
      const token = newAccess.startsWith('Bearer ') ? newAccess.slice(7) : newAccess;
      setAccessTokenMemory(token);
      apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
