// frontend/src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // ✅ point to full backend path
  withCredentials: true,               // ✅ allow cookie to be sent
});

export default instance;
