import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    proxy: {
      '/api': {
        target: 'https://backend-virid.vercel.app/user', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()],
})

//https://backend-virid.vercel.app/user