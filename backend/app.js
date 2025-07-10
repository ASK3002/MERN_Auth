// app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // adjust if frontend runs elsewhere
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/summary', summaryRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('ToDo API is running');
});

module.exports = app;
