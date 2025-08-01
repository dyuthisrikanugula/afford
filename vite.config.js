import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true, // Ensures Vite exits if port 3000 is unavailable
  },
});
