import { config } from './index.js';

export const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    const allowedOrigins = [config.clientUrl];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
};
