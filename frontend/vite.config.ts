import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Vite automatically loads environment variables with VITE_ prefix
  // from .env files locally and from Vercel environment variables in production
});
