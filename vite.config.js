import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pathname from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": pathname.resolve(__dirname, "./src"),
    },
  },
});
