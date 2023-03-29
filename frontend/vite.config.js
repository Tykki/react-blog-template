import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
           target: 'http://localhost:8000/',
           changeOrigin: true,
           secure: false,      
           rewrite: path => path.replace(/^\/api/, ''),
       }
  },
  // cors: true,
  },
})
