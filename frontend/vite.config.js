import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Dev-only proxy so the browser talks to Vite (same-origin) instead of
    // directly to FastAPI on :8000. This sidesteps the missing CORS config
    // on the backend without touching any backend code.
    // Every request to /api/* is forwarded to the FastAPI server and the
    // /api prefix is stripped before it reaches FastAPI.
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
