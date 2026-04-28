import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Three.js is large by nature - raise the warning threshold
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three/fiber') ||
            id.includes('node_modules/@react-three/drei') ||
            id.includes('node_modules/@react-three/postprocessing')
          ) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/qrcode.react')) {
            return 'vendor-qr';
          }
        },
      },
    },
  },
})
