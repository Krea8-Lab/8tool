import { highlightedLinesAtom, highlighterAtom, setLoadingLanguage } from "@/store";
import { themeDarkModeAtom, themeAtom } from "@/store/themes";
import { Language, LANGUAGES } from "@/util/languages";
import { cn } from "@/utils/cn";
import { createSignal, createEffect } from "solid-js";

import styles from "./Editor.module.css";

export interface HighlightedCodeProps {
  selectedLanguage: Language | null;
  code: string;
}

function escapeHtml(str: string): string {
  return str.replace(/[\u00A0-\u9999<>&]/g, (i) => `&#${i.charCodeAt(0)};`);
}

export const HighlightedCode = (props: HighlightedCodeProps) => {
  const [highlightedHtml, setHighlightedHtml] = createSignal("");
  let lastRunId = 0;

  createEffect(() => {
    const code = props.code;
    const selectedLanguage = props.selectedLanguage;
    const hl = highlighterAtom();
    const hlLines = highlightedLinesAtom();
    const isDark = themeDarkModeAtom();
    const currentTheme = themeAtom();
    const themeName =
      currentTheme.id === "tailwind"
        ? isDark
          ? "tailwind-dark"
          : "tailwind-light"
        : "css-variables";

    const runId = ++lastRunId;

    if (!hl || !selectedLanguage || selectedLanguage === LANGUAGES.plaintext) {
      setHighlightedHtml(escapeHtml(code));
      return;
    }

    (async () => {
      try {
        const loadedLanguages = hl.getLoadedLanguages() || [];
        const langName = selectedLanguage.name.toLowerCase();
        const hasLoadedLanguage = loadedLanguages.includes(langName);

        if (!hasLoadedLanguage && selectedLanguage.src) {
          setLoadingLanguage(true);
          try {
            const raw = await selectedLanguage.src();
            await hl.loadLanguage(raw.default || raw);
          } finally {
            setLoadingLanguage(false);
          }
        }

        let lang = langName;
        if (lang === "typescript") {
          lang = "tsx";
        }

        const html = hl.codeToHtml(code, {
          lang: lang,
          theme: themeName,
          transformers: [
            {
              line(node, line) {
                node.properties["data-line"] = line;
                if (hlLines.includes(line)) {
                  this.addClassToHast(node, "highlighted-line");
                }
              },
            },
          ],
        });

        if (runId === lastRunId) {
          setHighlightedHtml(html);
        }
      } catch (e) {
        console.error("Error highlighting code", e);
        if (runId === lastRunId) {
          setHighlightedHtml(escapeHtml(code));
        }
      }
    })();
  });

  return (
    <div
      class={cn(
        styles.formatted,
        props.selectedLanguage === LANGUAGES.plaintext && styles.plainText,
      )}
      innerHTML={highlightedHtml()}
    />
  );
};

export default HighlightedCode;
