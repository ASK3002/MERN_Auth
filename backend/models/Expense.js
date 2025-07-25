import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Health', 'Bills', 'Shopping', 'Other'],
    default: 'Other',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Expense', expenseSchema);
