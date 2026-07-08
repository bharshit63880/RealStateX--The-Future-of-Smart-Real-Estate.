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
