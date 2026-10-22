# Ray.so (SolidStart Edition) - Project Documentation

## 1. Project Overview

**Ray.so (SolidStart Edition)** is a full port and refactor of Raycast's popular [ray.so](https://ray.so) code snippet image generator. The original application was built with **Next.js 16 (App Router) and React 19**. This repository (`rayCode`) is a rewrite into a modern **SolidStart 2.0 and Solid.js 1.9** application.

The application allows developers to:
- Paste or type source code in 60+ programming languages.
- Apply 30+ meticulously designed themes and partner frames (such as Vercel, Supabase, Tailwind, OpenAI, Stripe, Firecrawl, Gemini, AWS, Clerk, etc.).
- Customize padding, background gradient, dark/light window styles, line numbers, and typography.
- Export high-resolution code snippet images as PNG, SVG, or copy them directly to the clipboard.
- Automatically format code using Prettier (JavaScript, TypeScript, HTML, CSS, etc.) or Ruff WASM (Python).
- Save and share snippets instantly via two-way synchronized URL hash states and URL shorteners.

---

## 2. Technology Stack & Migration Mapping

Every React-specific library and Next.js pattern in the original codebase was replaced with a Solid or web-standard alternative:

| Feature / Domain | Original Next.js Stack | SolidStart Stack | Rationale |
| :--- | :--- | :--- | :--- |
| **Meta-Framework** | Next.js 16 (App Router) | **SolidStart 2.0 (`@solidjs/start`)** | Full SSR and hybrid static rendering, file-system routing, and unified Nitro server engine. |
| **Reactivity & UI** | React 19 (`useState`, `useEffect`, Jotai) | **Solid.js 1.9 Fine-grained Reactivity** | Real DOM node manipulation without a Virtual DOM overhead; reactive signals (`createSignal`), memos (`createMemo`), and control flow (`<Show>`, `<For>`). |
| **Server Engine** | Next.js Node Runtime / Edge | **Nitro 3 (`node-server` preset)** | Lightweight, cross-platform server runtime for production and edge deployment. |
| **Bundler & Build Tool**| Webpack / Turbopack | **Vite 8 + Rolldown** | Lightning-fast HMR and bundle compilation. |
| **Styling** | Tailwind CSS v4 | **Tailwind CSS v4 (`@tailwindcss/vite`)** | Next-generation Tailwind CSS with native CSS variables and `@theme` directive support. |
| **Headless UI** | Radix UI / Base UI / Sonner | **Zag.js for Solid (`@zag-js/solid`)** | State-machine driven headless components for Dialog, Menu, Combobox, Tooltip, Toast, and Switch. |
| **Keyboard Shortcuts** | `hotkeys-js` | **`@tanstack/solid-hotkeys`** | Solid-friendly hotkey bindings with an SSR-safe wrapper. |
| **State Management** | `jotai` + `jotai-location` | **Native Solid Signals + URL Hash Sync** | Global signals in `src/store/` with bidirectional hash synchronization (`#code=...&theme=...`). |
| **Syntax Highlighting** | `shiki` + `highlight.js` | **`shiki` + `highlight.js`** | High-fidelity token-based highlighting with dual-theme (light/dark) support. |
| **Code Formatting** | Prettier + `@astral-sh/ruff-wasm-web` | **Prettier + `@astral-sh/ruff-wasm-web`** | In-browser formatting using WebAssembly and standalone Prettier plugins. |
| **Image Export** | `html-to-image` + SVG rasterizer | **`html-to-image` + Canvas + Web Audio** | High-DPI screenshot generation with audio click cues and clipboard integration. |
| **SVG Processing** | `@svgr/webpack` | **`vite-plugin-solid-svg`** | Imports SVGs as native Solid JSX components or raw asset URLs via `?url`. |

---

## 3. Directory & File Structure

```
rayCode/
├── public/                     # Static public assets (fonts, icons, sound effects)
│   ├── favicon.ico
│   ├── favicon.png
│   ├── click.mp3               # Audio feedback for export/copy
│   └── fonts/                  # Commit Mono & Soehne Mono woff2 font files
├── src/
│   ├── app.css                 # Tailwind CSS v4 configuration, @font-face, and theme variables
│   ├── app.tsx                 # Root SolidStart application shell with MetaProvider and Toast container
│   ├── entry-client.tsx        # Client hydration entry point
│   ├── entry-server.tsx        # Server-side rendering entry point
│   │
│   ├── assets/                 # Partner brand assets, background patterns, and logos
│   │   ├── aws.svg
│   │   ├── vercel.svg
│   │   ├── supabase.svg
│   │   ├── tailwind.svg
│   │   ├── beams.png
│   │   └── ...
│   │
│   ├── components/             # Reusable UI and application components
│   │   ├── icons.tsx           # Native Solid SVG icons extracted from Raycast icon set
│   │   ├── navigation.tsx      # Top bar navigation and branding header
│   │   ├── social-footer.tsx   # Social links and footer section
│   │   ├── unique-svg.tsx      # SVG ID uniqueness enhancer
│   │   │
│   │   ├── ui/                 # Headless UI primitives powered by Zag.js
│   │   │   ├── button.tsx
│   │   │   ├── button-group.tsx
│   │   │   ├── combobox.tsx    # Searchable select component (used for Languages)
│   │   │   ├── dialog.tsx      # Modal dialog (used for About modal)
│   │   │   ├── dropdown-menu.tsx# Export menu with secondary options
│   │   │   ├── kbd.tsx         # Keyboard badge component
│   │   │   ├── switch.tsx      # Toggle switch (Dark mode, Background, Line numbers)
│   │   │   ├── toast.tsx       # Toast notifications
│   │   │   └── tooltip.tsx     # Context tooltips
│   │   │
│   │   └── code/               # Main editor and frame components
│   │       ├── Controls.tsx        # Main floating control bar
│   │       ├── ControlContainer.tsx# Floating responsive container
│   │       ├── ThemeControl.tsx    # Theme dropdown selector
│   │       ├── LanguageControl.tsx # Language search combobox
│   │       ├── PaddingControl.tsx  # Padding segmented toggle (16, 32, 64, 128)
│   │       ├── DarkModeControl.tsx # Dark / light mode toggle
│   │       ├── BackgroundControl.tsx# Canvas background toggle
│   │       ├── LineNumberControl.tsx# Line numbers toggle
│   │       ├── Editor.tsx          # Code input area with tab support & scroll sync
│   │       ├── HighlightedCode.tsx # Shiki syntax highlighting engine
│   │       ├── Frame.tsx           # Main snippet window with window buttons
│   │       ├── ResizableFrame.tsx  # Interactive canvas with drag handles
│   │       ├── ExportButton.tsx    # Export button, clipboard copy, and formats
│   │       ├── FormatCodeButton.tsx# Code formatting trigger
│   │       ├── InfoDialog.tsx      # "About Ray.so" information dialog
│   │       ├── FlashMessage.tsx    # Transient flash alerts
│   │       │
│   │       └── frames/         # 19 branded partner frames
│   │           ├── Auth0Frame.tsx
│   │           ├── AwsFrame.tsx
│   │           ├── BrowserbaseFrame.tsx
│   │           ├── ClerkFrame.tsx
│   │           ├── CloudflareFrame.tsx
│   │           ├── DefaultFrame.tsx
│   │           ├── ElevenLabsFrame.tsx
│   │           ├── FirecrawlFrame.tsx
│   │           ├── GeminiFrame.tsx
│   │           ├── MintlifyFrame.tsx
│   │           ├── NuxtFrame.tsx
│   │           ├── OpenAIFrame.tsx
│   │           ├── PrismaFrame.tsx
│   │           ├── ResendFrame.tsx
│   │           ├── StripeFrame.tsx
│   │           ├── SupabaseFrame.tsx
│   │           ├── TailwindFrame.tsx
│   │           ├── TriggerdevFrame.tsx
│   │           └── VercelFrame.tsx
│   │
│   ├── lib/
│   │   └── image.ts            # Image generation utilities (PNG/SVG export)
│   │
│   ├── routes/                 # File-system routing
│   │   ├── index.tsx           # Main application page
│   │   ├── [404].tsx           # Not found fallback
│   │   └── api/
│   │       ├── config.ts       # Public API endpoint returning languages, themes, and padding
│   │       └── shorten-url.ts  # Dub.co URL shortener integration
│   │
│   ├── store/                  # Solid fine-grained reactive state
│   │   ├── index.ts            # Global signals and bidirectional URL hash sync
│   │   ├── themes.ts           # 30+ theme configs, partner definitions, and syntax tokens
│   │   ├── code.ts             # Default snippets and auto-language detection
│   │   ├── font.ts             # Typography configurations
│   │   ├── padding.ts          # Canvas padding options
│   │   ├── image.ts            # Export resolution and image settings
│   │   └── flash.ts            # Transient message signals
│   │
│   └── util/                   # Core helpers and browser utilities
│       ├── cn.ts               # clsx + twMerge utility
│       ├── common.ts           # Base URL and helper constants
│       ├── download.ts         # Browser file download helper
│       ├── formatCode.ts       # Prettier & Ruff WASM code formatting
│       ├── languages.ts        # Language definitions and Shiki grammar loaders
│       ├── theme-css-variables.ts # Custom CSS variable generation for partner themes
│       ├── useAudio.ts         # Sound effect synthesis on user action
│       ├── useHotkeys.ts       # SSR-safe TanStack hotkey bindings
│       ├── useIsSafari.ts      # Safari detection helper
│       └── usePngClipboardSupported.ts # Clipboard API feature detection
│
├── package.json
├── tsconfig.json
└── vite.config.ts              # Vite 8 + SolidStart + Solid SVG + Tailwind plugins
```

---

## 4. Key Systems & Architecture

### 4.1 State Management & URL Hash Synchronization

Instead of Jotai atoms with `atomWithHash`, the Solid port utilizes native Solid signals and memos coupled with an explicit, SSR-safe hash synchronization pipeline in [src/store/index.ts](file:///D:/CodeBase/rayCode/src/store/index.ts):

1. **Reactive Signals**:
   - `theme` / `setTheme`: Selected theme object (Default, Vercel, Stripe, etc.).
   - `language` / `setLanguage`: Active programming language ID.
   - `code` / `setCode`: Source code text.
   - `title` / `setTitle`: Window title text.
   - `padding` / `setPadding`: Margin around code frame (16, 32, 64, or 128 px).
   - `darkMode` / `setDarkMode`: Toggle between dark and light editor windows.
   - `background` / `setBackground`: Show or hide the gradient/pattern canvas background.
   - `showLineNumbers` / `setShowLineNumbers`: Line number visibility.

2. **Serialization & Deserialization**:
   - URL hash format: `#code=<base64>&language=<lang>&theme=<theme>&darkMode=true&...`
   - Strings are encoded with `js-base64` (`Base64.encodeURI` / `Base64.decode`).
   - When the URL hash changes (via browser back/forward buttons or direct link entry), a window `hashchange` listener deserializes values and updates the Solid signals.
   - When any signal changes via user interaction, an effect updates `window.location.hash` with `history.replaceState` to maintain clean browser history.

### 4.2 Syntax Highlighting Engine

Implemented in [src/components/code/HighlightedCode.tsx](file:///D:/CodeBase/rayCode/src/components/code/HighlightedCode.tsx):
- Built on top of `shiki` using `createHighlighterCore` with an explicit `createOnigurumaEngine(getWasm)` WebAssembly engine (required in modern Shiki v3/v4).
- Shiki and its WebAssembly engine are dynamically imported inside client-side `onMount` to ensure SSR isolation and prevent Nitro's unwasm compilation issues.
- Dynamically imports language grammars on demand from `@shikijs/langs`.
- Incorporates monotonic execution IDs (`runId`) to eliminate asynchronous race conditions during fast typing.
- Generates custom dual-theme Shiki themes dynamically using `convertToShikiTheme` for every partner frame (e.g., Stripe, AWS, Clerk, Gemini, Vercel), faithfully reflecting their brand identity.
- Line highlighting, line numbers, and diff styling (`+` / `-` lines) are preserved.
- When languages or snippets are altered, HighlightedCode reacts immediately with zero layout thrashing.

### 4.3 Code Formatting Engine

Implemented in [src/util/formatCode.ts](file:///D:/CodeBase/rayCode/src/util/formatCode.ts):
- **Python**: Uses `@astral-sh/ruff-wasm-web` running entirely in WebAssembly in the browser.
- **JavaScript, TypeScript, JSX, TSX, CSS, HTML, JSON, Markdown, YAML**: Formatted using `prettier/standalone` with respective parser plugins loaded asynchronously.
- The "Format Code" button automatically toggles loading states and flashes success or syntax error messages.

### 4.4 Image Export Pipeline

Implemented in [src/lib/image.ts](file:///D:/CodeBase/rayCode/src/lib/image.ts) and [src/components/code/ExportButton.tsx](file:///D:/CodeBase/rayCode/src/components/code/ExportButton.tsx):
- **PNG Export**: Captures the DOM node of `#frame` using `html-to-image` at user-selected pixel ratios (1x, 2x) while embedding local fonts (Commit Mono, Soehne Mono, Inter).
- **SVG Export**: Clones the DOM structure, inlines styles and fonts, and packages the result as an SVG data URL or blob.
- **Clipboard Copy**: Detects browser support for `navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])` and triggers a toast notification along with a tactile audio click.

---

## 5. Development & Production Operations

### Prerequisites
- **Bun** (v1.2+ recommended) or **Node.js** (v20+)

### Commands

| Command | Action |
| :--- | :--- |
| `bun install` | Install all dependencies |
| `bun run dev` | Launch Vite development server with SolidStart SSR on `http://localhost:3000` |
| `bun run build` | Build production client bundle and Nitro server bundle in `.output/` |
| `bun run start` | Run the compiled production Nitro server (`node .output/server/index.mjs`) |
| `bun run preview`| Preview the production build via Vite preview |

---

## 6. Verification & Quality Assurance

The SolidStart refactoring was verified through:
1. **Compilation & Bundle**: Complete Vite and Nitro production build (`bun run build`) passing with **exit code 0** and zero unresolved modules.
2. **SSR & Hydration**: Server-side rendering verified on port 3000 returning valid SolidStart `$HY` hydrated markup.
3. **API Endpoints**: `/api/config` and `/api/shorten-url` tested and operating as expected.
4. **Partner Frame Visual Integrity**: All 19 partner frame layouts, backgrounds, SVGs, and syntax palettes verified.
