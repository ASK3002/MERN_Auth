import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import TrendSuggestions from '../components/TrendSuggestions';

export default function Dashboard() {
  const { user } = useAuth();
  console.log('Dashboard user:', user);

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 pt-8 gap-8">
      {/* 📈 Left Sidebar - Market Watch */}
      <div className="w-full md:w-1/4 dark:bg-slate-800 p-6 rounded-2xl shadow-lg border dark:border-slate-700 hover:shadow-xl transition-all duration-200">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          📈 Market Watch
        </h2>
        <div className="overflow-hidden rounded-xl">
          <iframe
            src="https://s.tradingview.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%22all%22%2C%22showChart%22%3Atrue%2C%22locale%22%3A%22en%22%2C%22width%22%3A%22auto%22%2C%22height%22%3A500%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Afalse%2C%22showSymbolLogo%22%3Atrue%2C%22symbolsGroups%22%3A%5B%7B%22name%22%3A%22Tech%20Stocks%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22NASDAQ%3AAAPL%22%2C%22displayName%22%3A%22Apple%22%7D%2C%7B%22name%22%3A%22NASDAQ%3AGOOG%22%2C%22displayName%22%3A%22Google%22%7D%2C%7B%22name%22%3A%22NASDAQ%3AMSFT%22%2C%22displayName%22%3A%22Microsoft%22%7D%2C%7B%22name%22%3A%22NASDAQ%3AAMZN%22%2C%22displayName%22%3A%22Amazon%22%7D%2C%7B%22name%22%3A%22NASDAQ%3ATSLA%22%2C%22displayName%22%3A%22Tesla%22%7D%5D%7D%5D%2C%22gridLineColor%22%3A%22%233a3a3a%22%2C%22fontColor%22%3A%22%23cccccc%22%2C%22trendLineColor%22%3A%22%23fdd835%22%2C%22underLineColor%22%3A%22rgba(253%2C216%2C53%2C0.15)%22%2C%22activeTickerBackgroundColor%22%3A%22%2322263b%22%7D"
            width="100%"
            height="500"
            frameBorder="0"
            allowTransparency="true"
            scrolling="no"
            title="Tech Stocks Overview"
          ></iframe>
        </div>
      </div>

      {/* 🎯 Main Dashboard Panel */}
      <div className="flex-1 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border dark:border-slate-700 hover:shadow-xl transition-all duration-200">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
          Welcome, {user?.name}!
        </h1>
        <p className="text-base text-gray-700 dark:text-gray-300 mb-1">
          Email: {user?.email}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          You're logged into SpendSense — your secure personal finance dashboard.
        </p>

        <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          What's Next?
        </h2>
        <ul className="text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1 mb-4 text-base">
          <li>Track daily expenses and categories</li>
          <li>Visualize monthly spending (Bar or Pie chart)</li>
          <li>Secure session with JWT & cookies</li>
        </ul>

        <Link
          to="/expenses"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl shadow transition-all duration-200"
        >
          Go to Expense Tracker
        </Link>

        {/* ✅ AI Suggestions Preview */}
        <div className="mt-10">
          <TrendSuggestions />
        </div>
      </div>
    </div>
  );
}
