// frontend/src/utils/axios.js
import axios from 'axios';
const baseURL = 
  process.env.NODE_ENV === 'development'
    ? 'https://spendsense-7a5q.onrender.com/'  // dev backend URL
    : '/api';                      // prod relative API

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
