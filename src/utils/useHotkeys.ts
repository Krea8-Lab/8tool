import { useHotkey } from "@ark-ui/solid/hotkeys";

export interface UseHotkeysOptions {
  allowInInput?: boolean;
  preventDefault?: boolean;
}

export default function useHotkeys(
  keyCombo: string,
  handler: (event: KeyboardEvent) => void,
  options: UseHotkeysOptions = {},
) {
  const normalizedCombo = keyCombo.toLowerCase().trim();
  const combos =
    normalizedCombo === "?" || normalizedCombo === "shift+/" ? ["?", "shift+/"] : [keyCombo];

  for (const combo of combos) {
    useHotkey(() => ({
      hotkey: combo,
      action: (event) => {
        if (options.preventDefault) {
          event.preventDefault();
        }
        handler(event);
      },
      options: {
        preventDefault: options.preventDefault ?? false,
        enableOnFormTags: options.allowInInput ? true : false,
        enableOnContentEditable: options.allowInInput ? true : false,
      },
    }));
  }
}
