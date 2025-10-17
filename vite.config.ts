import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

const imageOptimizerConfig = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  png: {
    quality: 80,
  },
  jpeg: {
    quality: 80,
  },
  jpg: {
    quality: 80,
  },
  webp: {
    lossless: true,
  },
} as const

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteImageOptimizer(imageOptimizerConfig)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'vendor-helmet': ['react-helmet-async'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
