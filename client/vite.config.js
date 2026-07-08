import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '@components': path.resolve(process.cwd(), 'src/components'),
      '@config': path.resolve(process.cwd(), 'src/config'),
      '@layouts': path.resolve(process.cwd(), 'src/layouts'),
      '@pages': path.resolve(process.cwd(), 'src/pages'),
      '@routes': path.resolve(process.cwd(), 'src/routes'),
      '@services': path.resolve(process.cwd(), 'src/services'),
      '@styles': path.resolve(process.cwd(), 'src/styles'),
      '@utils': path.resolve(process.cwd(), 'src/utils'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
