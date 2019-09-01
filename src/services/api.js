import axios from 'axios';
import baseUrl from './baseUrl';

const api = axios.create({
  baseURL: baseUrl
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('token') || '';
  const headers = config;
  headers.headers['Content-Type'] = 'application/json';
  headers.headers.Authorization = `Bearer ${token}`;

  return headers;
});

export default api;
