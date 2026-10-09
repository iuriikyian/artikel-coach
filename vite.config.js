import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes the built files work from any folder or static host (even file://-adjacent hosting)
export default defineConfig({
  base: './',
  plugins: [react()],
});
