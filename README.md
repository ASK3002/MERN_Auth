
# MERN User Authentication App

A complete full-stack **MERN Authentication System** featuring secure login, signup, logout, and protected dashboard routing. Built using modern React with Tailwind CSS, and a robust Express + MongoDB backend with JWT-based authentication.

## 🔥 Features

- 🔐 **User Authentication**: Signup, Login, Logout
- ✅ **Protected Routes**: Only accessible with a valid session token
- 🍪 **JWT with HTTP-only Cookies**: Secure session management
- 🔁 **Persistent Login**: Auto-login on page refresh
- 🔄 **React Context API** for global auth state
- 🧪 **UX Enhancements**: Toasts for feedback, responsive UI

## 🛠 Tech Stack

### Frontend
- React + Vite
- React Router DOM
- Tailwind CSS
- react-hot-toast

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
git clone https://github.com/your-username/mern-auth-app.git
cd mern-auth-app
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
mern-auth-app/
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

## ✅ Routes

### Public
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Protected
- `GET /api/auth/me`
- `POST /api/auth/logout`

## 🙌 Acknowledgements

This project was built to demonstrate modern MERN stack capabilities and help junior developers showcase full-stack authentication skills.

---

## 📃 License

Licensed under the [MIT License](LICENSE).
