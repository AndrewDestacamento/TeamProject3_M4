import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// `npm run dev` serves the UI on :5173 and forwards /api to the Python server on :8000.
// `npm run build` writes frontend/dist, which app.py serves directly.
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  server: {
    port: 5173,
    proxy: { "/api": { target: "http://localhost:8000", changeOrigin: true } },
  },
  build: { outDir: "dist", emptyOutDir: true, chunkSizeWarningLimit: 1200 },
});
