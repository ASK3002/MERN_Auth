import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import toast from 'react-hot-toast';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', category: '', date: '' });
  const [summary, setSummary] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
  });
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const COLORS = ['#3b82f6', '#22c55e', '#eab308', '#f97316', '#06b6d4', '#ec4899'];

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('/expenses');
      setExpenses(res.data);
    } catch {
      toast.error('Failed to fetch expenses');
    }
  };

  useEffect(() => {
    const filtered = selectedMonth
      ? expenses.filter(exp => new Date(exp.date).getMonth() === parseInt(selectedMonth))
      : expenses;
    setFilteredExpenses(filtered);
  }, [expenses, selectedMonth]);

  const fetchSummary = async () => {
    try {
      const res = await axios.get('/expenses/summary');
      setSummary(res.data);
    } catch {
      toast.error('Failed to fetch summary');
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/expenses', form);
      toast.success('Expense added');
      setForm({ title: '', amount: '', category: '', date: '' });
      fetchExpenses();
      fetchSummary();
    } catch {
      toast.error('Add failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/expenses/${id}`);
      toast.success('Deleted');
      setExpenses(expenses.filter(exp => exp._id !== id));
      fetchSummary();
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`/expenses/${id}`, editForm);
      toast.success('Updated');
      setEditingId(null);
      fetchExpenses();
      fetchSummary();
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 bg-slate-800 text-white shadow-2xl rounded-xl">
      <h2 className="text-3xl font-bold mb-6">Track Expenses</h2>

      {/* Monthly Summary Chart */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold"> Monthly Summary</h3>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="bg-slate-800 border border-slate-600 px-2 py-1 rounded text-white focus:outline-none"
          >
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          {chartType === 'bar' ? (
            <BarChart data={summary}>
              <defs>
                {summary.map((_, index) => (
                  <linearGradient id={`bar-grad-${index}`} x1="0" y1="0" x2="0" y2="1" key={index}>
                    <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={1} />
                    <stop offset="100%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip />
              <Bar dataKey="total" radius={[10, 10, 0, 0]}>
                {summary.map((_, index) => (
                  <Cell key={index} fill={`url(#bar-grad-${index})`} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <defs>
                {summary.map((_, index) => (
                  <linearGradient id={`grad-${index}`} x1="0" y1="0" x2="1" y2="1" key={index}>
                    <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={COLORS[index % COLORS.length]} stopOpacity={1} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={summary}
                dataKey="total"
                nameKey="month"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                label
                stroke="#1e293b"
                strokeWidth={2}
              >
                {summary.map((_, index) => (
                  <Cell key={index} fill={`url(#grad-${index})`} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Upload CSV Section */}
      <div className="mb-6">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const fileInput = e.target.elements.file;
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            try {
              await axios.post('/expenses/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
              toast.success('Expenses uploaded');
              fetchExpenses();
              fetchSummary();
              e.target.reset();
            } catch {
              toast.error('Upload failed');
            }
          }}
        >
          <label className="block mb-2 text-white font-semibold">Upload CSV:</label>
          <div className="flex gap-3">
            <input
              type="file"
              name="file"
              accept=".csv"
              required
              className="text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Upload
            </button>
          </div>
        </form>
      </div>

      {/* Add Expense Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {['Title', 'Amount', 'Category', 'Date'].map((field, i) => (
          <input
            key={field}
            type={field === 'Amount' ? 'number' : field === 'Date' ? 'date' : 'text'}
            placeholder={field}
            value={form[field.toLowerCase()]}
            onChange={(e) => setForm({ ...form, [field.toLowerCase()]: e.target.value })}
            required
            className="bg-slate-800 text-white border border-slate-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Add Expense
        </button>
      </form>

      {/* Filter and Total */}
      <div className="flex justify-between items-center mb-6">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-slate-800 border border-slate-600 px-2 py-1 rounded text-white"
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <p className="text-lg font-medium">
          Total: ₹{filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0)}
        </p>
      </div>

      {/* Expense List */}
      <ul className="space-y-4">
        {filteredExpenses.map((exp) => (
          <li
            key={exp._id}
            className="bg-slate-800 p-4 rounded shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            {editingId === exp._id ? (
              <div className="w-full md:flex gap-2">
                {['title', 'amount', 'category', 'date'].map((field) => (
                  <input
                    key={field}
                    type={field === 'amount' ? 'number' : field === 'date' ? 'date' : 'text'}
                    value={editForm[field]}
                    onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                    className="bg-slate-700 text-white border border-slate-600 p-1 rounded w-full md:w-auto"
                  />
                ))}
                <button
                  onClick={() => handleUpdate(exp._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-400 hover:underline"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="font-semibold text-white">{exp.title} - ₹{exp.amount}</p>
                  <p className="text-sm text-gray-400">
                    {exp.category} | {new Date(exp.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-3 mt-2 md:mt-0">
                  <button
                    onClick={() => {
                      setEditingId(exp._id);
                      setEditForm({
                        title: exp.title,
                        amount: exp.amount,
                        category: exp.category,
                        date: exp.date.slice(0, 10),
                      });
                    }}
                    className="text-blue-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
