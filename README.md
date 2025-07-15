# 💸 SpendSense - MERN Authentication + Expense Tracker App

**SpendSense** is a full-stack **MERN Authentication + Personal Expense Tracker** application. It features secure login, signup, logout, protected dashboard routing, and a fully functional expense manager with a monthly summary chart. Built using modern React with Tailwind CSS on the frontend, and a robust Express + MongoDB backend with JWT-based authentication and cookie-based sessions.


## 🔥 Features

### 🔐 Authentication System
- Signup, Login, Logout
- Protected Routes using JWT in HTTP-only cookies
- Persistent login on page refresh
- React Context API for global auth state
- Toast notifications for UX feedback

### 💰 Expense Tracker
- Add, edit, delete personal expenses
- Categorize by title, category, date
- Bar chart to visualize monthly spending trends (via MongoDB aggregation)
- Filter and view total expenses by month

## 🛠 Tech Stack

### Frontend
- React + Vite
- React Router DOM
- Tailwind CSS
- react-hot-toast
- recharts (for charts)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- bcryptjs for password hashing
- jsonwebtoken for session tokens
- cookie-parser for secure cookies
- dotenv for environment management

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mern-auth-expense-tracker.git
cd mern-auth-expense-tracker
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in `/backend`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

> App runs at: `http://localhost:5173`  
> Backend runs at: `http://localhost:5000`

## 📁 Folder Structure

```
mern-auth-expense-tracker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── utils/
│   └── main.jsx
```

## ✅ API Routes

### Public
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Protected (Requires cookie-based token)
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/expenses`
- `POST /api/expenses`
- `PUT /api/expenses/:id`
- `DELETE /api/expenses/:id`
- `GET /api/expenses/summary`

## 🙌 Acknowledgements

This project was built to demonstrate full-stack MERN capabilities with secure authentication and data visualization using MongoDB and Recharts.

---

## 📃 License

Licensed under the [MIT License](LICENSE).