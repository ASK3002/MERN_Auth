import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import toast from 'react-hot-toast';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
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
            ? expenses.filter(exp => {
                const month = new Date(exp.date).getMonth(); // 0-indexed
                return month === parseInt(selectedMonth);
            })
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
        fetchSummary(); // Refresh chart too
        } catch {
        toast.error('Add failed');
        }
    };

    const handleDelete = async (id) => {
        try {
        await axios.delete(`/expenses/${id}`);
        toast.success('Deleted');
        setExpenses(expenses.filter(exp => exp._id !== id));
        fetchSummary(); // Refresh chart
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
        <div className="max-w-4xl mx-auto p-4 mt-6 bg-white shadow rounded">
        <h2 className="text-2xl font-semibold mb-4">Track Expenses</h2>

        {/* Monthly Summary Chart */}
        <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Monthly Summary</h3>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summary}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6" />
            </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="border p-2 rounded"
            />
            <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            className="border p-2 rounded"
            />
            <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            className="border p-2 rounded"
            />
            <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className="border p-2 rounded"
            />
            <button
            type="submit"
            className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
            Add Expense
            </button>
        </form>

        {/* Filter and Total */}
        <div className="flex justify-between items-center mb-4">
        <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border px-2 py-1 rounded"
        >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
            ))}
        </select>
        <p className="font-medium">
            Total: ₹
            {filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0)}
        </p>
        </div>


        {/* List */}
        <ul className="space-y-3">
            {filteredExpenses.map((exp) => (
                <li
                key={exp._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border-b py-2 gap-2"
                >
                {editingId === exp._id ? (
                    <div className="w-full md:flex md:items-center gap-2">
                    <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="border p-1 rounded w-full md:w-auto"
                    />
                    <input
                        type="number"
                        value={editForm.amount}
                        onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                        className="border p-1 rounded w-full md:w-auto"
                    />
                    <input
                        type="text"
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="border p-1 rounded w-full md:w-auto"
                    />
                    <input
                        type="date"
                        value={editForm.date}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        className="border p-1 rounded w-full md:w-auto"
                    />
                    <button
                        onClick={() => handleUpdate(exp._id)}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-500 hover:underline"
                    >
                        Cancel
                    </button>
                    </div>
                ) : (
                    <>
                    <div>
                        <p className="font-medium">{exp.title} - ₹{exp.amount}</p>
                        <p className="text-sm text-gray-500">{exp.category} | {new Date(exp.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-3">
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
                        className="text-blue-500 hover:underline"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDelete(exp._id)}
                        className="text-red-500 hover:underline"
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
