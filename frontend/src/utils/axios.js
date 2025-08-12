// frontend/src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
 baseURL: 'https://spendsense-a-s-k.onrender.com/api', // ✅ point to full backend path
  withCredentials: true,               // ✅ allow cookie to be sent
});

export default instance;
