import { createSignal, onMount, onCleanup, createMemo, JSX } from "solid-js";
import styles from "./Editor.module.css";
import {
  code,
  setCode,
  isCodeExample,
  selectedLanguage,
} from "@/store/code";
import {
  THEMES,
  themeAtom,
  themeCSSAtom,
  themeFontAtom,
  themeLineNumbersAtom,
  unlockedThemesAtom,
  setUnlockedThemesAtom,
  setThemeId,
} from "@/store/themes";
import useHotkeys from "@/utils/useHotkeys";
import HighlightedCode from "./HighlightedCode";
import { triggerFlash } from "@/store/flash";
import { highlightedLinesAtom, setHighlightedLines } from "@/store";
import { LANGUAGES } from "@/util/languages";
import { cn } from "@/utils/cn";
import { Dynamic } from "solid-js/web";

function indentText(text: string) {
  return text
    .split("\n")
    .map((str) => `  ${str}`)
    .join("\n");
}

function dedentText(text: string) {
  return text
    .split("\n")
    .map((str) => str.replace(/^\s\s/, ""))
    .join("\n");
}

function getCurrentlySelectedLine(textarea: HTMLTextAreaElement) {
  const original = textarea.value;
  const selectionStart = textarea.selectionStart;
  const beforeStart = original.slice(0, selectionStart);
  return original
    .slice(beforeStart.lastIndexOf("\n") !== -1 ? beforeStart.lastIndexOf("\n") + 1 : 0)
    .split("\n")[0];
}

function handleTab(textarea: HTMLTextAreaElement, shiftKey: boolean) {
  const original = textarea.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const beforeStart = original.slice(0, start);
  const currentLine = getCurrentlySelectedLine(textarea);

  if (start === end) {
    if (shiftKey) {
      const newStart = beforeStart.lastIndexOf("\n") + 1;
      textarea.setSelectionRange(newStart, end);
      document.execCommand("insertText", false, dedentText(original.slice(newStart, end)));
    } else {
      document.execCommand("insertText", false, "  ");
    }
  } else {
    const newStart = beforeStart.lastIndexOf("\n") + 1 || 0;
    textarea.setSelectionRange(newStart, end);

    if (shiftKey) {
      const newText = dedentText(original.slice(newStart, end));
      document.execCommand("insertText", false, newText);
      if (currentLine.startsWith("  ")) {
        textarea.setSelectionRange(start - 2, start - 2 + newText.length);
      } else {
        textarea.setSelectionRange(start, start + newText.length);
      }
    } else {
      const newText = indentText(original.slice(newStart, end));
      document.execCommand("insertText", false, newText);
      textarea.setSelectionRange(start + 2, start + 2 + newText.length);
    }
  }
}

function handleEnter(textarea: HTMLTextAreaElement) {
  const currentLine = getCurrentlySelectedLine(textarea);
  const currentIndentationMatch = currentLine.match(/^(\s+)/);
  let wantedIndentation = currentIndentationMatch ? currentIndentationMatch[0] : "";

  if (currentLine.match(/([{\[:>])$/)) {
    wantedIndentation += "  ";
  }

  document.execCommand("insertText", false, `\n${wantedIndentation}`);
}

function handleBracketClose(textarea: HTMLTextAreaElement) {
  const currentLine = getCurrentlySelectedLine(textarea);
  const { selectionStart, selectionEnd } = textarea;

  if (selectionStart === selectionEnd && currentLine.match(/^\s{2,}$/)) {
    textarea.setSelectionRange(selectionStart - 2, selectionEnd);
  }

  document.execCommand("insertText", false, "}");
}

const fontMap: Record<string, string> = {
  "fira-code": styles.firaCode,
  "google-sans": styles.googleSans,
  inter: styles.inter,
  // legacy aliases for backward compatibility fallback
  "jetbrains-mono": styles.firaCode,
  "geist-mono": styles.firaCode,
  "ibm-plex-mono": styles.firaCode,
  "soehne-mono": styles.firaCode,
  "roboto-mono": styles.firaCode,
  "commit-mono": styles.firaCode,
  "space-mono": styles.firaCode,
  "source-code-pro": styles.firaCode,
  "google-sans-code": styles.googleSans,
};

export const Editor = () => {
  let textareaRef: HTMLTextAreaElement | undefined;
  const [isHighlightingLines, setIsHighlightingLines] = createSignal(false);

  const numberOfLines = createMemo(() => (code().match(/\n/g) || []).length);

  useHotkeys("f", (event) => {
    event.preventDefault();
    textareaRef?.focus();
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!textareaRef) return;
    switch (event.key) {
      case "Tab":
        event.preventDefault();
        handleTab(textareaRef, event.shiftKey);
        break;
      case "}":
        event.preventDefault();
        handleBracketClose(textareaRef);
        break;
      case "Escape":
        event.preventDefault();
        textareaRef.blur();
        break;
      case "Enter":
        event.preventDefault();
        handleEnter(textareaRef);
        break;
    }
  };

  const handleChange = (event: InputEvent & { currentTarget: HTMLTextAreaElement }) => {
    const val = event.currentTarget.value;
    const currentTheme = themeAtom();
    const unlocked = unlockedThemesAtom();

    if (val.includes("🐰") && currentTheme.id !== THEMES.rabbit.id) {
      if (!unlocked.includes(THEMES.rabbit.id)) {
        setUnlockedThemesAtom([...unlocked, THEMES.rabbit.id]);
      }
      setThemeId(THEMES.rabbit.id);
      try {
        localStorage.setItem("codeTheme", THEMES.rabbit.id);
      } catch (error) {
        console.log("Could not set theme in localStorage", error);
      }
      triggerFlash({
        message: "Evil Rabbit Theme Unlocked",
        variant: "unlock",
        timeout: 2000,
        icon: THEMES.rabbit.icon ? <Dynamic component={THEMES.rabbit.icon} style={{ color: "black" }} /> : undefined,
      });
    }

    setCode(val);
  };

  const handleFocus = () => {
    if (isCodeExample() && textareaRef) {
      setTimeout(() => {
        textareaRef?.select();
      }, 1);
    }
  };

  onMount(() => {
    const clickListener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const lineEl = target.closest("[data-line]") as HTMLElement;
      const lineNumber = lineEl?.dataset?.line;
      if (lineNumber && isHighlightingLines()) {
        const line = Number(lineNumber);
        setHighlightedLines((prev) =>
          prev.includes(line) ? prev.filter((l) => l !== line) : [...prev, line]
        );
      }
    };

    const keydownListener = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        setIsHighlightingLines(true);
      }
    };

    const keyupListener = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        setIsHighlightingLines(false);
      }
    };

    document.addEventListener("click", clickListener);
    document.addEventListener("keydown", keydownListener);
    document.addEventListener("keyup", keyupListener);

    onCleanup(() => {
      document.removeEventListener("click", clickListener);
      document.removeEventListener("keydown", keydownListener);
      document.removeEventListener("keyup", keyupListener);
    });
  });

  const fontClass = () => {
    const f = themeFontAtom();
    return f && fontMap[f] ? fontMap[f] : styles.firaCode;
  };

  return (
    <div
      class={cn(
        styles.editor,
        fontClass(),
        isHighlightingLines() && styles.isHighlightingLines,
        themeLineNumbersAtom() &&
          selectedLanguage() !== LANGUAGES.plaintext && [
            styles.showLineNumbers,
            numberOfLines() > 8 && styles.showLineNumbersLarge,
          ]
      )}
      style={{
        "--editor-padding": "16px",
        ...(themeCSSAtom() as JSX.CSSProperties),
      }}
      data-value={code()}
    >
      <textarea
        rows={1}
        tabIndex={-1}
        autocomplete="off"
        autocorrect="off"
        spellcheck={false}
        autoCapitalize="off"
        ref={textareaRef}
        class={styles.textarea}
        value={code()}
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        data-enable-grammarly="false"
      />
      <HighlightedCode code={code()} selectedLanguage={selectedLanguage()} />
    </div>
  );
};

export default Editor;
