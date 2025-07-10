// frontend/src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ point to full backend path
  withCredentials: true,               // ✅ allow cookie to be sent
});

export default instance;
