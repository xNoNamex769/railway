import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.56.1:3001/api',
});

export default api;
