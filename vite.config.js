import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using a relative base ('./') so the built site works correctly
// whether it's served at the repo root or at /<repo-name>/ on GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: './',
})
