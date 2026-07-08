import mongoose from 'mongoose';

import { config } from './index.js';
import { logger } from '../shared/logger/index.js';

export const connectDatabase = async () => {
  mongoose.set('strictQuery', true);

  await mongoose.connect(config.mongoUri, {
    autoIndex: !config.isProduction,
    serverSelectionTimeoutMS: 10000,
  });

  logger.info({ database: mongoose.connection.name }, 'MongoDB connected');
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
  logger.info('MongoDB disconnected');
};
