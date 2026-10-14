import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// Requests to /api are forwarded to the Express backend (see backend/).
const apiProxy = {
  '/api': {
    target: process.env.API_URL ?? 'http://localhost:4000',
    changeOrigin: true,
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: apiProxy,
  },
  preview: {
    proxy: apiProxy,
  },
});
