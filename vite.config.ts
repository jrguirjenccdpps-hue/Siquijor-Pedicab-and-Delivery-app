import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
// GitHub Pages configuration
// Replace 'siquijor-pedicab-booking' with your actual repository name if different
export default defineConfig({
  base: '/siquijor-pedicab-booking/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
