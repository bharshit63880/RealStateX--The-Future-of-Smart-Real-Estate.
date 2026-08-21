import mongoose from 'mongoose';

import { config } from './index.js';
import { logger } from '../shared/logger/index.js';

const DNS_FAILURE_CODES = new Set(['ECONNREFUSED', 'ETIMEOUT', 'ESERVFAIL', 'ENOTFOUND']);

const createSeedListUri = () => {
  if (!config.mongoFallbackHosts || !config.mongoReplicaSet) return null;

  const credentials = config.mongoUri.match(/^mongodb\+srv:\/\/([^@]+)@/u)?.[1];
  if (!credentials) return null;

  const hosts = config.mongoFallbackHosts
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean)
    .map((host) => (host.includes(':') ? host : `${host}:27017`))
    .join(',');

  if (!hosts) return null;

  const options = new URLSearchParams({
    tls: 'true',
    replicaSet: config.mongoReplicaSet,
    authSource: 'admin',
    retryWrites: 'true',
    w: 'majority',
  });

  return `mongodb://${credentials}@${hosts}/${config.mongoDatabase}?${options}`;
};

const connect = (uri) =>
  mongoose.connect(uri, {
    autoIndex: !config.isProduction,
    serverSelectionTimeoutMS: 10000,
  });

export const connectDatabase = async () => {
  mongoose.set('strictQuery', true);

  try {
    await connect(config.mongoUri);
  } catch (error) {
    const fallbackUri = createSeedListUri();
    const isSrvDnsFailure = error.syscall === 'querySrv' && DNS_FAILURE_CODES.has(error.code);

    if (!isSrvDnsFailure || !fallbackUri) {
      if (config.databaseRequired) throw error;
      logger.error(
        { code: error.code, name: error.name },
        'MongoDB unavailable; continuing in development without persistence',
      );
      return false;
    }

    logger.warn(
      { code: error.code, hostname: error.hostname },
      'MongoDB SRV DNS resolution failed; retrying with configured seed list',
    );
    try {
      await connect(fallbackUri);
    } catch (fallbackError) {
      if (config.databaseRequired) throw fallbackError;
      logger.error(
        { code: fallbackError.code, name: fallbackError.name },
        'MongoDB seed-list fallback unavailable; continuing in development without persistence',
      );
      return false;
    }
  }

  logger.info({ database: mongoose.connection.name }, 'MongoDB connected');
  return true;
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
  logger.info('MongoDB disconnected');
};
