import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import { solidStart } from "@solidjs/start/config";
import solidSvg from "vite-plugin-solid-svg";
import path from "node:path";

export default defineConfig({
  plugins: [
    solidStart(),
    solidSvg({
      defaultAsComponent: true,
    }),
    tailwindcss(),
    nitro()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "~": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
