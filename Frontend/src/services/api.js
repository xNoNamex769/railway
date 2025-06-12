import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Asegúrate de que el backend esté corriendo en el puerto 3001
});

export default api;
