import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// ✅ base: '/' для кастомного домена (CNAME)
// ✅ Если используешь GitHub Pages без домена (username.github.io/repo),
//    замени base на '/имя-репозитория/'
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Разбиваем чанки для лучшей кэшируемости
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
