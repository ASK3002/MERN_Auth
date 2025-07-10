import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);
    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ msg: 'User created', user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken(user._id);
    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ msg: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const logout = (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .json({ msg: 'Logged out' });
};

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: 'Not authorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ msg: 'User not found' });

    // ✅ wrap in object
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Invalid token' });
  }
};
