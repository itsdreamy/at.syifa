import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || '*';

// CORS configuration
app.use(
  cors({
    origin: CLIENT_URL === '*' ? '*' : CLIENT_URL.split(','),
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health check root alias
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'at-syifa-api', version: '1.0.0' });
});

// Serve static client if built in client/dist
const clientDistPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// 404 handler for API routes
app.use('/api', notFoundHandler);

// Fallback to client index.html for client-side routing if client/dist exists
app.get('*', (req, res, next) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      notFoundHandler(req, res, next);
    }
  });
});

// Global error handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`🚀 at.syifa backend API server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
