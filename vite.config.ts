
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Bridges the gap for the SDK requirements to use process.env
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    'process.env.LIPANA_API_KEY': JSON.stringify(process.env.LIPANA_API_KEY)
  }
});
