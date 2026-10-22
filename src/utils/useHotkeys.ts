import { onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";

function isEditable(el: EventTarget | null) {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return (
    el.isContentEditable ||
    el.getAttribute("role") === "option" ||
    ((tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") &&
      "readOnly" in el &&
      !(el as HTMLInputElement).readOnly)
  );
}

export default function useHotkeys(
  keyCombo: string,
  handler: (e: KeyboardEvent) => void,
  options: { allowInInput?: boolean } = {},
) {
  if (isServer) return;

  const onKeyDown = (e: KeyboardEvent) => {
    const parts = keyCombo
      .toLowerCase()
      .split("+")
      .map((s) => s.trim());
    const needCtrlOrMeta =
      parts.includes("mod") ||
      parts.includes("cmd") ||
      parts.includes("command") ||
      parts.includes("⌘");
    const needShift = parts.includes("shift") || parts.includes("⇧");
    const needAlt = parts.includes("alt") || parts.includes("option") || parts.includes("⌥");

    const mainKey = parts[parts.length - 1];

    if (!options.allowInInput && isEditable(e.target)) {
      const isFormat = mainKey === "f" && needShift && needAlt;
      const isEscape = e.key === "Escape";
      if (!isFormat && !isEscape) {
        return;
      }
    }

    const hasMeta = e.metaKey || e.ctrlKey;
    if (needCtrlOrMeta && !hasMeta) return;
    if (!needCtrlOrMeta && hasMeta) return;

    if (needShift && !e.shiftKey) return;
    if (needAlt && !e.altKey) return;

    let matchKey = false;
    if (mainKey === "/" || mainKey === "?") {
      matchKey = e.key === "/" || e.key === "?";
    } else if (mainKey === "escape" || mainKey === "esc") {
      matchKey = e.key === "Escape";
    } else {
      matchKey = e.key.toLowerCase() === mainKey;
    }

    if (matchKey) {
      handler(e);
    }
  };

  onMount(() => {
    window.addEventListener("keydown", onKeyDown);
    onCleanup(() => {
      window.removeEventListener("keydown", onKeyDown);
    });
  });
}
