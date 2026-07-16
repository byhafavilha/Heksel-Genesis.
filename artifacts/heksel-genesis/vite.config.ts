import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const PORT = parseInt(process.env.PORT ?? '24303', 10);
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base: BASE_PATH,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: PORT,
    allowedHosts: true,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: PORT,
    allowedHosts: true,
    strictPort: true,
  },
});
