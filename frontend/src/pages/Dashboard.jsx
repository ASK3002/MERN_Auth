// frontend/src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  console.log('Dashboard user:', user);

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-400/25 p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Welcome, {user?.name}!
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-1">Email: {user?.email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        You're logged into SpendSense — your secure personal finance dashboard.
      </p>

      <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>

      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        What's Next?
      </h2>
      <ul className="text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1 mb-4">
        <li>Track daily expenses and categories</li>
        <li>Visualize monthly spending (Bar or Pie chart)</li>
        <li>Secure session with JWT & cookies</li>
      </ul>

      <Link
        to="/expenses"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Expense Tracker
      </Link>
    </div>
  );
}
