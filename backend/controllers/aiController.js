// backend/controllers/aiController.js
import Expense from '../models/Expense.js';
import { format } from 'date-fns';

export const getTrendSuggestions = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get latest month
    const latestExpense = await Expense.find({ user: userId }).sort({ date: -1 }).limit(1);
    if (!latestExpense.length) return res.json({ suggestions: [], trends: [] });

    const latestDate = latestExpense[0].date;
    const currentMonthIndex = latestDate.getMonth();
    const currentYear = latestDate.getFullYear();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthName = monthNames[currentMonthIndex];


    // Current month expenses by category
    const currentMonthExpenses = await Expense.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: new Date(currentYear, currentMonthIndex, 1),
            $lt: new Date(currentYear, currentMonthIndex + 1, 1)
          }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Past 3 months expenses by category
    const past3MonthExpenses = await Expense.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: new Date(currentYear, currentMonthIndex - 3, 1),
            $lt: new Date(currentYear, currentMonthIndex, 1)
          }
        }
      },
      {
        $group: {
          _id: {
            category: '$category',
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Restructure past data by category
    const categoryMap = {};
    for (let entry of past3MonthExpenses) {
      const category = entry._id.category;
      if (!categoryMap[category]) categoryMap[category] = [];
      categoryMap[category].push(entry.total);
    }

    const finalSuggestions = currentMonthExpenses.map((curr) => {
      const category = curr._id;
      const currentTotal = curr.total;
      const pastValues = categoryMap[category] || [];

      const avg = pastValues.length
        ? pastValues.reduce((a, b) => a + b, 0) / pastValues.length
        : 0;
      const min = pastValues.length ? Math.min(...pastValues) : 0;

      const suggestion = currentTotal > avg
      ? `In ${currentMonthName}, you spent ₹${currentTotal} on ${category} — higher than your 3-month average (₹${avg.toFixed(0)}).`
      : `Nice! Your ${category} spending in ${currentMonthName} is within average.`;


      return {
        category,
        currentMonthTotal: currentTotal,
        avg: Math.round(avg),
        min: Math.round(min),
        suggestion,
        currentMonthName
      };
    });

    const top3 = [...finalSuggestions]
      .sort((a, b) => b.currentMonthTotal - a.currentMonthTotal)
      .slice(0, 3)
      .map((s) => s.suggestion);

    return res.json({
      suggestions: top3,
      trends: finalSuggestions
    });
  } catch (err) {
    console.error('Trend AI error:', err);
    res.status(500).json({ message: 'Error generating suggestions' });
  }
};
