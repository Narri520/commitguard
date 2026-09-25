const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const apiRouter = require('./routes/apiRouter');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security Headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// CORS setup
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: '*',
    credentials: true
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests from this IP, please try again later.', errorCode: 'RATE_LIMIT_EXCEEDED' }
});
app.use('/api', limiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static Uploads Folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Root & Health
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'CommitGuard Express Backend', time: new Date() }));

// API Routes
app.use('/api', apiRouter);

// Centralized Error Middleware
app.use(errorHandler);

module.exports = app;
