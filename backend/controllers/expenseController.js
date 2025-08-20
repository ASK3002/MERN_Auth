import mongoose from 'mongoose';
import Expense from '../models/Expense.js';
import jwt from 'jsonwebtoken';

// Middleware helper to extract user ID from token
const getUserId = (req) => {
  const token = req.cookies.token;
  if (!token) throw new Error('No token');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

// Create a new expense
export const createExpense = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ use protect middleware
    const { title, amount, category, date } = req.body;

    const expense = await Expense.create({
      user: userId,
      title,
      amount,
      category,
      date,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Failed to create expense' });
  }
};

// Get all expenses for logged-in user
export const getExpenses = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ consistent
    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Failed to fetch expenses' });
  }
};


// Update expense
export const updateExpense = async (req, res) => {
  try {
    const userId = req.user._id;  // ✅ use protect middleware
    const { id } = req.params;

    const updated = await Expense.findOneAndUpdate(
      { _id: id, user: userId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: 'Not found or unauthorized' });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Failed to update expense' });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ use protect middleware
    const { id } = req.params;

    const deleted = await Expense.findOneAndDelete({ _id: id, user: userId });
    if (!deleted) return res.status(404).json({ msg: 'Not found or unauthorized' });

    res.status(200).json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Failed to delete expense' });
  }
};


// ✅ NEW: Delete all expenses for logged-in user
export const deleteAllExpenses = async (req, res) => {
  try {
    await Expense.deleteMany({ user: req.user._id });
    res.json({ message: 'All expenses deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete all expenses' });
  }
};



export const getMonthlySummary = async (req, res) => {
  const userId = req.user.id;

  try {
    const debug = await Expense.find({ user: userId }).limit(5);
    // console.log("Expenses for summary debug:", debug);

    const summary = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: '$amount' }
        }
      },
      {
        $addFields: {
          monthNum: '$_id'
        }
      },
      {
        $project: {
          total: 1,
          _id: 0,
          month: {
            $arrayElemAt: [
              ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              '$monthNum'
            ]
          }
        }
      },
      { $sort: { monthNum: 1 } }
    ]);

    // console.log('Monthly summary:', summary);
    res.json(summary);
  } catch (err) {
    console.error('Summary error:', err);
    res.status(500).json({ msg: 'Error fetching summary' });
  }
};

