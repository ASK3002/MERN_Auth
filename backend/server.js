import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import expenseSuggestionRoute from './routes/expenseSuggestionRoute.js'; // 👈 NEW
import aiRoutes from './routes/aiRoutes.js';
import cors from 'cors';
import path  from "path";

dotenv.config();
connectDB();

const _dirname=path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/expenses/suggestions', expenseSuggestionRoute);

app.use('/api/ai', aiRoutes);

// Serve static frontend
app.use(express.static(path.join(_dirname, 'frontend/dist')));

// Only for non-API routes
app.get(/^(?!\/api).*/, (_, res) => {
  res.sendFile(path.join(_dirname, 'frontend/dist/index.html'));
});


app.get('/', (req, res) => {
  res.send('API running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
