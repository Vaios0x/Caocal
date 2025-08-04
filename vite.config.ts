import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Optimizaciones de rendimiento de Vite v6
  optimizeDeps: {
    // Pre-bundling mejorado para dependencias comunes
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'swr',
      'zustand',
      'clsx',
      'tailwind-merge',
      '@radix-ui/react-progress',
      'class-variance-authority'
    ],
    // Excluir dependencias que no necesitan pre-bundling
    exclude: ['@tailwindcss/postcss']
  },

  // Configuración de build optimizada
  build: {
    // Target moderno para mejor rendimiento
    target: 'esnext',
    
    // Optimizaciones de rollup
    rollupOptions: {
      output: {
        // Chunk splitting optimizado
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'state-vendor': ['zustand', 'swr'],
          'utils-vendor': ['clsx', 'tailwind-merge']
        }
      }
    },
    
    // Optimizaciones de CSS
    cssCodeSplit: true,
    
    // Minificación mejorada
    minify: 'esbuild',
    
    // Source maps para desarrollo
    sourcemap: false
  },

  // Configuración del servidor de desarrollo
  server: {
    // Puerto configurado
    port: 5173,
    
    // Hot Module Replacement optimizado
    hmr: {
      overlay: true
    },
    
    // Optimizaciones de rendimiento
    fs: {
      strict: false
    }
  },

  // Configuración de preview
  preview: {
    port: 4173,
    host: true
  },

  // Variables de entorno
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  },

  // Configuración de assets
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'],

  // Configuración de CSS
  css: {
    // PostCSS optimizado
    postcss: './postcss.config.js',
    
    // Preprocessor options si es necesario
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },

  // Configuración de resolución de módulos
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@store': '/src/store',
      '@data': '/src/data',
      '@lib': '/src/lib'
    }
  },

  // Configuración de dependencias
  dependencies: {
    // Optimización de dependencias
    optimizeDeps: {
      force: false
    }
  }
})
