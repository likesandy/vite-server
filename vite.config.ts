import { defineConfig } from 'vite'
import { resolve } from 'path' // 导入 path 模块
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      utils: resolve(__dirname, 'src/utils'),
      components: resolve(__dirname, 'src/components'),
    },
  },
})

