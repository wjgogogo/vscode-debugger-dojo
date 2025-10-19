import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // 开启 sourcemap 以便调试
    sourcemap: true,
  },
  build: {
    sourcemap: true,
  },
})
