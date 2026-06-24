import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: "./",
  server: {
    host: "::",
    port: 4180,
    hmr: {
      overlay: false,
    },
  },
  // preview binds all interfaces so a production build can be tested over the local network
  preview: {
    host: "::",
    port: 4180,
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
}));
