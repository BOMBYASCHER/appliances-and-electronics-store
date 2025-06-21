import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: false,
  },
  preview: {
    host: true,
    port: 5173,
    allowedHosts: [
      'maconi-store-client.onrender.com',
    ],
  },
})
