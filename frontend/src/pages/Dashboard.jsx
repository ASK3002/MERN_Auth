// frontend/src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  console.log('Dashboard user:', user);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-semibold mb-2">Welcome, {user?.name}!</h1>
      <p className="text-gray-700 mb-2">Email: {user?.email}</p>
      <p className="text-sm text-gray-500">
        This is your private dashboard. More features coming soon!
      </p>
    </div>
  );
}
