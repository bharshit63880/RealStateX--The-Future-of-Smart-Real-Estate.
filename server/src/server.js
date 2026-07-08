import http from 'node:http';

import app from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { config } from './config/index.js';
import { logger } from './shared/logger/index.js';

const server = http.createServer(app);

const startServer = async () => {
  await connectDatabase();

  server.listen(config.port, () => {
    logger.info(
      {
        env: config.nodeEnv,
        port: config.port,
        apiVersion: config.apiVersion,
      },
      'RealStateX API started',
    );
  });
};

const shutdown = async (signal) => {
  logger.info({ signal }, 'Shutdown requested');

  server.close(async () => {
    await disconnectDatabase();
    logger.info('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'Unhandled promise rejection');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.fatal({ error }, 'Uncaught exception');
  process.exit(1);
});

startServer().catch((error) => {
  logger.fatal({ error }, 'Failed to start server');
  process.exit(1);
});
