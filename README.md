<img src="/public/placeholder.png" alt="placeholder" />

# 8tool

> A high-performance, modern rewrite of Raycast's [ray.so](https://ray.so) code snippet generator, powered by **SolidStart 2.0**, **Solid.js 1.9**, and **Tailwind CSS v4**.

Create beautiful, shareable images of your code with 60+ language grammars, 30+ themes and branded partner frames, in-browser formatting, and instant clipboard/image exports.

[![Netlify](https://api.netlify.com/api/v1/badges/8b9619c7-8909-41e6-82e1-ed65a5041d5f/deploy-status)](https://app.netlify.com/projects/8tool/deploys)

---

## ⚡ Highlights

- **Fine-Grained Reactivity**: Built with Solid.js 1.9—zero Virtual DOM overhead, surgical DOM updates, and lightning-fast responsiveness.
- **Modern Meta-Framework**: SolidStart 2.0 with Vite 8 and the Nitro 3 server engine for seamless SSR and edge deployment.
- **60+ Programming Languages**: Powered by [Shiki](https://shiki.style) with WebAssembly Oniguruma engine for VS Code-grade syntax highlighting and diff support.
- **30+ Themes & 19 Branded Partner Frames**: Beautiful frame presets including **Vercel, Supabase, Tailwind, Stripe, OpenAI, Gemini, AWS, Clerk, Cloudflare, Resend, Firecrawl, Nuxt**, and more.
- **Client-Side Code Formatting**:
  - **Python**: Formatted in-browser with **Ruff** compiled to WebAssembly (`@astral-sh/ruff-wasm-web`).
  - **JS/TS/JSON/CSS/HTML/Markdown**: Formatted client-side with **Prettier**.
- **Flexible Canvas Controls**: Toggle dark/light window modes, customizable canvas padding (16–128px), line numbers, and custom gradient/pattern backgrounds.
- **Multi-Format Export**: Export high-resolution PNGs (1x, 2x), scalable SVGs, or copy directly to your clipboard with tactile audio feedback.
- **Zero-Backend State Sync**: Full snippet state (code, language, theme, toggles) is encoded bidirectionally in the URL hash for friction-free sharing.
- **Accessible Primitives**: Dialogs, menus, comboboxes, switches, and tooltips powered by state machines via [Zag.js for Solid](https://zagjs.com).

---

## 🔄 Tech Stack & Migration Architecture

This project is a complete port and architectural migration from the original Next.js 16 (React 19) codebase to the Solid ecosystem:

| Domain                  | Original Stack                     | SolidStart Stack                          | Why Solid?                                                                            |
| :---------------------- | :--------------------------------- | :---------------------------------------- | :------------------------------------------------------------------------------------ |
| **Meta-Framework**      | Next.js 16 (App Router)            | **SolidStart 2.0** (`@solidjs/start`)     | Unified Nitro 3 engine with blazing fast SSR and hybrid static rendering.             |
| **Reactivity**          | React 19 (`useState`, `useEffect`) | **Solid.js 1.9 Signals**                  | Fine-grained signals with direct DOM updates and no re-render cascades.               |
| **Server Engine**       | Next.js Node Runtime / Edge        | **Nitro 3** (`node-server` preset)        | Ultra-lightweight, portable, and fast production server runtime.                      |
| **Bundler & HMR**       | Turbopack / Webpack                | **Vite 8**                                | Instant Hot Module Replacement and optimized bundle splitting.                        |
| **Styling**             | Tailwind CSS v4                    | **Tailwind CSS v4** (`@tailwindcss/vite`) | Next-generation engine with native CSS variables and `@theme` tokens.                 |
| **Headless UI**         | Radix UI / Base UI / Sonner        | **Zag.js for Solid** (`@zag-js/solid`)    | Robust, framework-agnostic finite state machines for fully accessible UI.             |
| **Keyboard Shortcuts**  | `hotkeys-js`                       | **`@tanstack/solid-hotkeys`**             | Solid-friendly hotkey bindings with SSR safety.                                       |
| **State Sync**          | `jotai` + `jotai-location`         | **Native Solid Signals + URL Hash**       | Explicit, reactive URL hash serialization (`Base64`) with history management.         |
| **Syntax Highlighting** | `shiki` + `highlight.js`           | **`shiki` (WASM Oniguruma)**              | High-fidelity token-based highlighting with dual-theme (dark/light) dynamic palettes. |
| **Code Formatting**     | Prettier + Ruff WASM               | **Prettier + Ruff WASM**                  | Fast in-browser formatting without external API roundtrips.                           |
| **Image Rendering**     | `html-to-image` + Canvas           | **`html-to-image` + Web Audio**           | High-DPI rasterization with embedded web fonts (Commit Mono, Soehne Mono).            |

---

## 🚀 Getting Started

### Prerequisites

- **[Bun](https://bun.sh/)** (v1.2+ recommended) or **Node.js** (v24+)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Krea8-Lab/8tool.git
cd 8tool
bun install
# or: npm install
```

### 2. Environment Variables (Optional)

If you wish to enable the Dub URL shortening integration, create a `.env` file from the example:

```bash
cp .env.example .env
```

Add your Dub API token:

```env
DUB_TOKEN="your_dub_api_token"
```

### 3. Development Server

Start the local Vite dev server with SSR support:

```bash
bun run dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build & Deployment

To generate an optimized production bundle:

```bash
# Build the client assets and Nitro server output
bun run build

# Start the compiled production server
bun run start

# Or preview the build with Vite
bun run preview
```

The production output will be generated inside the `.output/` directory, ready to run on any Node.js environment or deploy to serverless/edge targets supported by Nitro (Vercel, Cloudflare Pages, Netlify, Docker, etc.).

---

## 🎨 Themes & Partner Frames

`Code Snippet` comes with built-in custom themes and official partner frames:

- **Raycast Default Frames**: Dark, Light, Crimson, Breeze, Midnight, Candy, Sunset, Emerald, and more.
- **Branded Partner Frames**:
  - `Vercel`
  - `Supabase`
  - `Tailwind CSS`
  - `Stripe`
  - `OpenAI`
  - `Google Gemini`
  - `AWS`
  - `Clerk`
  - `Cloudflare`
  - `Resend`
  - `Firecrawl`
  - `Nuxt`
  - `Mintlify`
  - `Prisma`
  - `ElevenLabs`
  - `Auth0`
  - `Browserbase`
  - `Trigger.dev`

---

## 💡 Keyboard Shortcuts

| Shortcut                                                                       | Action                           |
| :----------------------------------------------------------------------------- | :------------------------------- |
| <kbd>⌘</kbd> + <kbd>C</kbd> / <kbd>Ctrl</kbd> + <kbd>C</kbd> _(outside input)_ | Copy snippet image to clipboard  |
| <kbd>⌘</kbd> + <kbd>S</kbd> / <kbd>Ctrl</kbd> + <kbd>S</kbd>                   | Export image (PNG)               |
| <kbd>⌘</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd>                   | Open language picker             |
| <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd>                               | Auto-format current code snippet |

---

## 📜 Development Guidelines (Solid.js)

When contributing to this codebase, keep Solid's fine-grained reactivity in mind:

- **Do Not Destructure Props**: Always access props directly via `props.foo` or use `mergeProps()` to avoid breaking reactivity tracking.
- **Solid Control Flow**: Use `<Show>`, `<For>`, `<Switch>`, and `<Match>` instead of ternary expressions or `.map()`.
- **Direct Refs**: Assign DOM elements directly (`let ref: HTMLDivElement; <div ref={ref} />`) without wrapper ref objects.
- **SSR Safety**: Wrap browser-specific APIs (`window`, `localStorage`, `AudioContext`, `HTMLCanvasElement`) in `onMount()` or `typeof window !== "undefined"` checks.

---

## 🤝 Credits & Acknowledgments

- Original concept and design by the extraordinary team at [Raycast](https://raycast.com) ([ray.so](https://ray.so)).
- Re-architected and ported to [SolidStart](https://start.solidjs.com) and [Solid.js](https://solidjs.com).
- Highlighting powered by [Shiki](https://shiki.style).
- Formatting powered by [Prettier](https://prettier.io) and Astral's [Ruff](https://astral.sh/ruff).
