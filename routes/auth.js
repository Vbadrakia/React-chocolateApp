import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { generateToken } from '../config/jwt.js';

const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email === 'admin@example.com' ? 'admin' : 'user';

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user._id, user.email);

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.email);

    res.json({
      message: 'Login successful',
      user: { id: user._id, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
