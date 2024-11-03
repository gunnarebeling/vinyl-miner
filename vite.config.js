/// <reference types="vitest"/>
/// <reference types="vite/client"/>
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  test: {
    globals:true,
    environment: 'jsdom',
    setupFiles: './setupTests.jsx',
    css:true
  }
})
