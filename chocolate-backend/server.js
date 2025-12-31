import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || process.env.VITE_FRONTEND_URL;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

// Middleware
// CORS: allow specific frontend origin(s) in production; allow all in dev if none provided
const corsOptions = {
  origin: (origin, callback) => {
    const whitelist = new Set([
      ...ALLOWED_ORIGINS,
      ...(FRONTEND_URL ? [FRONTEND_URL] : []),
    ]);

    // If no whitelist configured, allow all (useful for local dev)
    if (whitelist.size === 0) {
      return callback(null, true);
    }

    if (!origin) {
      // Non-browser or same-origin requests
      return callback(null, true);
    }

    if (whitelist.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error('CORS: Origin not allowed'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    port: PORT,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    console.log('✓ Database connected');

    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('✗ Error starting server:', error);
    process.exit(1);
  }
};

startServer();
