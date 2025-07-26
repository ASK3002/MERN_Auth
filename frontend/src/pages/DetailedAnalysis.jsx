import useExpenseTrends from '../hooks/useExpenseTrends';

export default function DetailedAnalysis() {
  const { trends, loading } = useExpenseTrends(true);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-slate-800 text-slate-200 rounded-xl shadow-lg border border-slate-700">
      <h1 className="text-2xl font-semibold text-white tracking-tight mb-6">
        📊 Detailed Expense Analysis
      </h1>

      {loading ? (
        <p className="text-slate-400 italic">⏳ Loading analysis...</p>
      ) : trends.length ? (
        <div className="space-y-6">
          {trends.map((item, i) => (
            <div
              key={i}
              className="bg-slate-700/40 rounded-lg p-4 border border-slate-600 transition hover:scale-[1.01] hover:border-blue-500 duration-200"
            >
              <h2 className="text-lg font-semibold text-blue-400 mb-1">
                {item.category} – {item.currentMonthName}
              </h2>
              <p className="text-slate-300">
                ₹{item.currentMonthTotal} spent in {item.currentMonthName}.
                <br />
                <span className="text-slate-400 text-sm">
                  3-month Avg: ₹{item.avg}, Min: ₹{item.min}
                </span>
              </p>
              <p className="text-sm text-amber-300 mt-2">💡 {item.suggestion}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400">No trend data available yet.</p>
      )}
    </div>
  );
}
