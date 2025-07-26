import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
      toast.success('Logged out');
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">Dashboard</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
