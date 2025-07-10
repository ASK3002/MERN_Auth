import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import toast from 'react-hot-toast';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/signup', form);
      toast.success('Signup successful!');
      navigate('/'); // ✅ go to dashboard
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto mt-12 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
        className="w-full mb-3 px-4 py-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
        className="w-full mb-3 px-4 py-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Signup
      </button>
    </form>
  );
}
