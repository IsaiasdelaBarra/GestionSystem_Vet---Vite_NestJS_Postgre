import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Asegúrate de que sea 3000 y no otro
});

export default api;