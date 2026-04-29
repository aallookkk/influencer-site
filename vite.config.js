import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/influencer-site/', // CRITICAL: This must match your repo name
})
