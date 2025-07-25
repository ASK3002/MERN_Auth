import React from 'react';
import './index.css';
import { Toaster } from 'react-hot-toast';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // ✅ THIS LINE

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App  />
      <Toaster position="top-right" />
    </AuthProvider>
  </BrowserRouter>
);
