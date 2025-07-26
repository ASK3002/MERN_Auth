import { Link } from 'react-router-dom';
import useExpenseSuggestion from '../hooks/useExpenseTrends.js'; // ✅ Use the hook

const TrendSuggestions = () => {
  const { suggestions, loading } = useExpenseSuggestion(false); // false = dashboard view (top 3)

  return (
    <div className="p-4 bg-white dark:bg-green-600/45 shadow-md rounded-xl mt-4">
      <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">💡 AI Expense Suggestions</h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading trends...</p>
      ) : suggestions.length ? (
        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-100">
          {suggestions.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No suggestions available.</p>
      )}

      {/* ✅ Add "See Detailed Analysis" Button */}
      <Link
        to="/detailed-analysis" // ✅ Use correct path
        className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
        See Detailed Analysis
    </Link>

    </div>
  );
};

export default TrendSuggestions;
