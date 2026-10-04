/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import pkg from './package.json' with { type: 'json' }

// https://vitejs.dev/config/
export default defineConfig({
  base: "/skyview-wx",
  plugins: [svgr(), react()],
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version),
  },
  test: {
    environment: 'node',
  },
})
