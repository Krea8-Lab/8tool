# Agent Instructions: Ray.so SolidStart Project (`rayCode`)

## 1. Project Context & Purpose

This repository (`rayCode`) is a modern port and refactoring of the Raycast [ray.so](https://ray.so) code snippet generator, migrated from Next.js 16 / React 19 to **SolidStart 2.0 (`@solidjs/start`) and Solid.js 1.9**.

- **Runtime & Package Manager**: Bun (preferred) or Node.js v20+.
- **Framework**: SolidStart 2.0 with Nitro 3 engine and Vite 8.
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`), CSS Modules, and custom theme tokens.
- **Headless UI Primitives**: Zag.js for Solid (`@zag-js/solid`).
- **State**: Solid signals and memos with two-way URL hash persistence (`src/store/index.ts`).

---

## 2. Core Guidelines for AI Agents

### 🚨 STRICT SOLID.JS RULES (NO REACT CODE!)
1. **Never use React hooks**:
   - ❌ `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`, `useContext`
   - ✅ `createSignal`, `createEffect`, `createMemo`, `onMount`, `onCleanup`, `createContext`, `useContext`
2. **Never destructure component props**:
   - Destructuring props in Solid breaks fine-grained reactivity.
   - ❌ `const Button = ({ children, onClick, disabled }) => ...`
   - ✅ `const Button = (props) => <button onClick={props.onClick}>{props.children}</button>`
   - Use `mergeProps` if default prop values are required.
3. **Use Solid Control Flow Components**:
   - ❌ `items.map(item => <div key={item.id}>{item.name}</div>)`
   - ✅ `<For each={items()}>{(item) => <div>{item.name}</div>}</For>`
   - ❌ `isOpen ? <Modal /> : null`
   - ✅ `<Show when={isOpen()}><Modal /></Show>`
   - Use `<Switch>` and `<Match>` for multi-condition branching.
4. **HTML Attributes & Classes**:
   - In Solid, use `class` instead of `className`:
   - ✅ `class="flex items-center gap-2"` (or `classList={{ "active": isActive() }}`)
5. **DOM References**:
   - Use direct variable assignment for refs:
   - ✅ `let myRef: HTMLDivElement | undefined; ... <div ref={myRef} />`
   - No `useRef(null)` or `ref.current`.

---

## 3. Architecture & Code Conventions

### Headless UI with Zag.js
All accessible primitives (Tooltips, Menus, Dialogs, Comboboxes, Switches) use `@zag-js/solid`:
- Initialize machine with `zag.useMachine(...)`.
- Connect service with `zag.connect(service, zag.normalizeProps)`.
- Use the anatomy spread properties: `{...api().getRootProps()}`, `{...api().getTriggerProps()}`, etc.

### State Management (`src/store/`)
- All global editor state is held in reactive signals inside `src/store/`.
- [src/store/index.ts](file:///D:/CodeBase/rayCode/src/store/index.ts) manages bidirectional URL hash synchronization.
- When updating or adding signals that should persist in shareable URLs, ensure they are registered in the serialization logic (`syncHashWithState` and `readStateFromHash`).

### SSR & Browser Safety
- Always guard browser-only globals (`window`, `document`, `navigator`, `localStorage`, `AudioContext`, `HTMLCanvasElement`) with:
  ```typescript
  if (typeof window === "undefined") return;
  ```
  or run browser-dependent setup inside `onMount(() => { ... })`.

### CSS & Styling Conventions
- Utility classes are merged using `cn(...)` from `src/utils/cn.ts` (`clsx` + `twMerge`).
- When defining animations in `.module.css` files, **never nest `@keyframes` inside CSS selectors**. LightningCSS requires `@keyframes` declarations to be at top level to avoid parsing errors.
- Partner frame themes rely on CSS custom properties defined via `theme-css-variables.ts`.

### Assets & Icons
- Raycast SVG icons are located in `src/components/icons.tsx` as native Solid JSX components.
- Partner logos can be imported as Solid components (`import Icon from "@/assets/icon.svg"`) or asset URLs via `?url` suffix (`import iconUrl from "@/assets/icon.svg?url"`).

---

## 4. Key Development Commands

Run all commands from `rayCode/` (or with `--cwd rayCode`):

```bash
# Install dependencies
bun install

# Start Vite dev server with SSR (port 3000)
bun run dev

# Full production build (client assets + Nitro server)
bun run build

# Start production Nitro server
bun run start

# Preview build via Vite preview
bun run preview
```

---

## 5. Directory Map

| Path | Description |
| :--- | :--- |
| `src/routes/index.tsx` | Main application page with Frame, Editor, and Controls |
| `src/routes/api/config.ts` | Config API endpoint (languages, themes, padding) |
| `src/routes/api/shorten-url.ts`| Dub URL shortener endpoint |
| `src/components/code/` | Core editor, HighlightedCode (Shiki), Frame, Controls |
| `src/components/code/frames/` | 19 partner branded frames |
| `src/components/ui/` | Accessible Zag.js headless primitives |
| `src/store/` | Fine-grained signals & URL hash sync |
| `src/util/` | Formatters (Ruff WASM, Prettier), languages, audio |
| `src/assets/` | Static SVG icons, PNG patterns, and partner logos |
