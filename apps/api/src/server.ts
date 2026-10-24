import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config, logConfig } from './config/index.js';
import { getDatabase, closeDatabase } from './db/index.js';
import routes from './routes/index.js';

const app = express();

// Request logging (sanitized, zero secret leak)
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow local development and Vite preview
      if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for local testing
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));

// Mount API routes
app.use('/api', routes);

// Centralized 404 handler
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Centralized error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]', err.stack || err.message || err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(config.nodeEnv === 'development' ? { stack: err.stack } : {}),
  });
});

// Start Server
export function startServer() {
  logConfig();
  getDatabase(); // Initialize DB and schema

  const server = app.listen(config.port, () => {
    console.log(`🚀 Career Discovery API running at http://localhost:${config.port}`);
    console.log(`   Health check: http://localhost:${config.port}/api/health`);
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log('\n[Server] Shutting down gracefully...');
    server.close(() => {
      closeDatabase();
      console.log('[Server] HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return server;
}

if (process.argv[1]?.endsWith('server.ts') || process.argv[1]?.endsWith('server.js')) {
  startServer();
}

export default app;
