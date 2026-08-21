import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ezabadalagif/', // Change this to '/your-repo-name/' when deploying to GitHub Pages
})
