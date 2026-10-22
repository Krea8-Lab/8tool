import path from "node:path";

import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
  plugins: [
    solidStart(),
    solidSvg({
      defaultAsComponent: true,
    }),
    tailwindcss(),
    nitro(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "~": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
