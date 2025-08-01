import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ["node_modules"],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    sourcemap: false,
    rollupOptions: {
      treeshake: true,
    },
    outDir: "/var/www/html",
    emptyOutDir: true,
  },
  server: {
    port: 8080,
  },
});
