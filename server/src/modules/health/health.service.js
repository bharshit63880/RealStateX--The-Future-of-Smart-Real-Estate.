import mongoose from 'mongoose';

export const getHealth = () => ({
  status: 'ok',
  uptime: process.uptime(),
  timestamp: new Date().toISOString(),
  database: {
    connected: mongoose.connection.readyState === 1,
    name: mongoose.connection.name || null,
  },
});

export const getReadiness = (readyState = mongoose.connection.readyState) => {
  const connected = readyState === 1;
  return {
    status: connected ? 'ready' : 'not_ready',
    timestamp: new Date().toISOString(),
    checks: { database: connected ? 'up' : 'down' },
  };
};
