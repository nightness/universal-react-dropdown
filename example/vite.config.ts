import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@providers": path.resolve(__dirname, "src/providers"),
      "@pages": path.resolve(__dirname, "src/router/pages"),
      "@router": path.resolve(__dirname, "src/router"),
      src: path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    react(),
  ],
})
