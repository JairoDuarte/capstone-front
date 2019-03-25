import axios from "axios";
import {baseUrl} from './baseUrl';
const api = axios.create({
  baseURL: baseUrl
});

api.interceptors.request.use(async config => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;