import { Base64 } from "js-base64";
import type { Highlighter } from "shiki";
import { createSignal, createEffect } from "solid-js";
import { isServer } from "solid-js/web";

import { LANGUAGES } from "../util/languages";
import {
  code,
  userInputtedLanguage,
  setUserInputtedLanguage,
  setUserInputtedCode,
  detectLanguage,
  setDetectedLanguage,
} from "./code";
import { flashShown, setFlashShown } from "./flash";
import { Font, FONTS } from "./font";
import { isPadding, Padding } from "./padding";
import { themeId, setThemeId, darkMode, setDarkMode } from "./themes";

const [windowWidth, setWindowWidth] = createSignal<number | null>(null);
const [showBackground, setShowBackground] = createSignal<boolean>(true);
const [showLineNumbers, setShowLineNumbers] = createSignal<boolean | undefined>(undefined);
const [fileName, setFileName] = createSignal<string>("");
const [subtitle, setSubtitle] = createSignal<string>("");
const [highlighter, setHighlighter] = createSignal<Highlighter | null>(null);
const [loadingLanguage, setLoadingLanguage] = createSignal<boolean>(false);
const [highlightedLines, setHighlightedLines] = createSignal<number[]>([]);
export const [frameRef, setFrameRef] = createSignal<HTMLDivElement | null>(null);

const [fontOption, setFontOption] = createSignal<Font>("fira-code");
const [paddingOption, setPaddingOption] = createSignal<Padding>(64);

let isUpdatingFromHash = false;
let isInitialized = false;

export function readFromHash() {
  if (isServer) return;
  const hash = window.location.hash.slice(1);
  if (!hash) return;

  try {
    isUpdatingFromHash = true;
    const params = new URLSearchParams(hash);

    if (params.has("theme")) {
      const t = params.get("theme");
      if (t) setThemeId(t);
    }
    if (params.has("background")) {
      setShowBackground(params.get("background") === "true");
    }
    if (params.has("darkMode")) {
      setDarkMode(params.get("darkMode") === "true");
    }
    if (params.has("lineNumbers")) {
      setShowLineNumbers(params.get("lineNumbers") === "true");
    }
    if (params.has("padding")) {
      const p = parseInt(params.get("padding") || "", 10);
      if (isPadding(p)) setPaddingOption(p);
    }
    if (params.has("title")) {
      setFileName(params.get("title") || "");
    }
    if (params.has("subtitle")) {
      setSubtitle(params.get("subtitle") || "");
    }
    if (params.has("font")) {
      const f = params.get("font") as Font;
      if (FONTS.includes(f)) setFontOption(f);
    }
    if (params.has("language")) {
      const l = params.get("language");
      if (l && LANGUAGES[l]) {
        setUserInputtedLanguage(LANGUAGES[l]);
      } else if (l === "") {
        setUserInputtedLanguage(null);
      }
    }
    if (params.has("highlightedLines")) {
      const hl = params.get("highlightedLines");
      if (hl) {
        setHighlightedLines(hl.split(",").map(Number));
      } else {
        setHighlightedLines([]);
      }
    }
    if (params.has("width")) {
      const w = parseInt(params.get("width") || "", 10);
      if (!isNaN(w)) setWindowWidth(w);
    }
    if (params.has("code")) {
      try {
        const decoded = Base64.decode(params.get("code") || "");
        if (decoded) {
          setUserInputtedCode(decoded);
          if (!params.has("language")) {
            detectLanguage(decoded).then((langKey) => {
              if (LANGUAGES[langKey]) {
                setDetectedLanguage(LANGUAGES[langKey]);
              }
            });
          }
        }
      } catch (e) {
        console.error("Failed to decode code parameter", e);
      }
    }
  } finally {
    isUpdatingFromHash = false;
  }
}

export function syncToHash() {
  if (isServer || isUpdatingFromHash || !isInitialized) return;

  const params = new URLSearchParams();

  params.set("theme", themeId());
  params.set("background", String(showBackground()));
  params.set("darkMode", String(darkMode()));

  if (showLineNumbers() !== undefined) {
    params.set("lineNumbers", String(showLineNumbers()));
  }

  params.set("padding", String(paddingOption()));

  if (fileName()) {
    params.set("title", fileName());
  }

  if (subtitle()) {
    params.set("subtitle", subtitle());
  }

  if (fontOption() !== "fira-code") {
    params.set("font", fontOption());
  }

  const userLang = userInputtedLanguage();
  if (userLang) {
    const key = Object.keys(LANGUAGES).find((k) => LANGUAGES[k] === userLang);
    if (key) params.set("language", key);
  }

  const hlLines = highlightedLines();
  if (hlLines.length > 0) {
    params.set("highlightedLines", hlLines.join(","));
  }

  const w = windowWidth();
  if (w !== null) {
    params.set("width", String(w));
  }

  const currentCode = code();
  if (currentCode) {
    params.set("code", Base64.encodeURI(currentCode));
  }

  const newHash = `#${params.toString()}`;
  if (window.location.hash !== newHash) {
    window.history.replaceState(null, "", newHash);
  }
}

export function initHashSync() {
  if (isServer) return;
  readFromHash();
  isInitialized = true;

  window.addEventListener("hashchange", () => {
    readFromHash();
  });

  createEffect(() => {
    // Track all hash-relevant signals
    themeId();
    showBackground();
    darkMode();
    showLineNumbers();
    paddingOption();
    fileName();
    subtitle();
    fontOption();
    userInputtedLanguage();
    highlightedLines();
    windowWidth();
    code();

    syncToHash();
  });
}

// Export compatibility atoms/signals
export {
  windowWidth,
  setWindowWidth,
  windowWidth as windowWidthAtom,
  showBackground,
  setShowBackground,
  showBackground as showBackgroundAtom,
  showLineNumbers,
  setShowLineNumbers,
  showLineNumbers as showLineNumbersAtom,
  fileName,
  setFileName,
  fileName as fileNameAtom,
  subtitle,
  setSubtitle,
  subtitle as subtitleAtom,
  highlighter,
  setHighlighter,
  highlighter as highlighterAtom,
  loadingLanguage,
  setLoadingLanguage,
  loadingLanguage as loadingLanguageAtom,
  highlightedLines,
  setHighlightedLines,
  highlightedLines as highlightedLinesAtom,
  paddingOption,
  setPaddingOption,
  paddingOption as paddingAtom,
  setPaddingOption as setPadding,
  fontOption,
  setFontOption,
  fontOption as fontAtom,
  setFontOption as setFont,
  flashShown,
  setFlashShown,
};
