// backend/controllers/expenseSuggestionController.js
import Expense from '../models/Expense.js';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

export const getCategoryTrends = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const startLatest = startOfMonth(now);
    const endLatest = endOfMonth(now);
    const threeMonthsAgo = subMonths(startLatest, 3);

    const expenses = await Expense.find({
      user: userId,
      date: { $gte: threeMonthsAgo, $lte: endLatest },
    });

    const latestMonth = startLatest.getMonth();
    const monthlyData = {
      latest: {},
      previous: {},
    };

    expenses.forEach((exp) => {
      const month = new Date(exp.date).getMonth();
      const category = exp.category;

      if (month === latestMonth) {
        monthlyData.latest[category] = (monthlyData.latest[category] || 0) + exp.amount;
      } else {
        if (!monthlyData.previous[category]) {
          monthlyData.previous[category] = [];
        }
        monthlyData.previous[category].push(exp.amount);
      }
    });

    const result = Object.entries(monthlyData.latest).map(([category, latestAmount]) => {
      const prev = monthlyData.previous[category] || [];
      const average = prev.length ? prev.reduce((a, b) => a + b, 0) / prev.length : 0;
      const min = prev.length ? Math.min(...prev) : 0;

      return {
        category,
        latestAmount: parseFloat(latestAmount.toFixed(2)),
        averageAmount: parseFloat(average.toFixed(2)),
        minAmount: parseFloat(min.toFixed(2)),
      };
    });

    res.json(result);
  } catch (err) {
    console.error('Error getting category trends:', err);
    res.status(500).json({ message: 'Failed to fetch trends' });
  }
};
