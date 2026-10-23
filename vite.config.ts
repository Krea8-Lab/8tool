import path from "node:path";

import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import solidSvg from "vite-plugin-solid-svg";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
    bracketSpacing: true,
    arrowParens: "always",
    sortTailwindcss: {
      stylesheet: "./src/app.css",
      functions: ["clsx", "cn", "cva", "twMerge"],
    },
    sortImports: {
      internalPattern: ["~/**", "@/**"],
    },
    ignorePatterns: [
      "dist/**",
      ".output/**",
      ".vinxi/**",
      ".turbo/**",
      "node_modules/**",
      "public/**",
      "bun.lock",
    ],
  },
  lint: {
    plugins: ["typescript", "unicorn", "oxc", "import"],
    categories: {
      correctness: "error",
    },
    env: {
      builtin: true,
      browser: true,
      node: true,
    },
    rules: {
      "no-unassigned-vars": "off",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "unicorn/filename-case": "off",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    ignorePatterns: [
      "dist/**",
      ".output/**",
      ".vinxi/**",
      ".turbo/**",
      "node_modules/**",
      "public/**",
      "bun.lock",
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
  },
  plugins: lazyPlugins(() => [
    solidStart(),
    solidSvg({
      defaultAsComponent: true,
    }),
    tailwindcss(),
    nitro(),
  ]),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "~": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
