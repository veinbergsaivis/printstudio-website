import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

const imageOptimizerConfig = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  svg: {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            cleanupNumericValues: false,
            removeViewBox: false,
          },
        },
      },
    ],
  },
  png: {
    // PNG optimization options
    quality: 80,
  },
  jpeg: {
    // JPEG optimization options
    quality: 80,
  },
  jpg: {
    // JPG optimization options
    quality: 80,
  },
  webp: {
    // WebP optimization options
    lossless: true,
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer(imageOptimizerConfig),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
