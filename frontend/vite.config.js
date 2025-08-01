import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["react-icons", "framer-motion"],
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      treeshake: true,
    },
    outDir: "dist", // try relative path first
    emptyOutDir: true,
  },
  server: {
    port: 8080,
  },
});
