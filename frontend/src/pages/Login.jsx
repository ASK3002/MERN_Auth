import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/login', { email, password });
      toast.success('Login successful!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800">
      <form
        onSubmit={handleLogin}
        className="bg-slate-600/25 p-6 rounded shadow-md w-full max-w-sm"
        autoComplete="on" // ✅ enable browser autofill
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email" // ✅ important for autofill
          autoComplete="email" // ✅ helps browser recognize field
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded text-black"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          name="password" // ✅ important for autofill
          autoComplete="current-password" // ✅ tells browser it's a login password
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded text-black"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
