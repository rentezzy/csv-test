import { defineConfig } from "vite";
import dsv from "@rollup/plugin-dsv";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), dsv()],
});
