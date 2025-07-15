// frontend/src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  console.log('Dashboard user:', user);

  return (
    <div className="max-w-xl mx-auto bg-blue-500/30 p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-semibold mb-2">Welcome, {user?.name}!</h1>
      <p className="text-gray-700 mb-2">Email: {user?.email}</p>
      <p className="text-sm text-gray-500 mb-4">
        This is your private dashboard. More features coming soon!
      </p>

      {/* 👉 Add this to link to the expense tracker */}
      <Link
        to="/expenses"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go to Expenses
      </Link>
    </div>
  );
}
