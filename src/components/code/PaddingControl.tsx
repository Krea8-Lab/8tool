import { paddingOption, setPaddingOption } from "@/store";
import { PADDING_OPTIONS } from "@/store/padding";
import useHotkeys from "@/utils/useHotkeys";
import { For } from "solid-js";

import ControlContainer from "./ControlContainer";

import styles from "./PaddingControl.module.css";

export const PaddingControl = () => {
  useHotkeys("p", () => {
    const current = paddingOption();
    const currentIndex = PADDING_OPTIONS.indexOf(current);
    if (PADDING_OPTIONS[currentIndex + 1]) {
      setPaddingOption(PADDING_OPTIONS[currentIndex + 1]);
    } else {
      setPaddingOption(PADDING_OPTIONS[0]);
    }
  });

  return (
    <ControlContainer title="Padding">
      <div class={styles.toggleGroup} role="radiogroup" aria-label="Frame Padding">
        <For each={PADDING_OPTIONS}>
          {(option) => (
            <button
              type="button"
              class={styles.toggleGroupItem}
              aria-checked={paddingOption() === option}
              onClick={() => setPaddingOption(option)}
              role="radio"
              aria-label={`${option}`}
            >
              {option}
            </button>
          )}
        </For>
      </div>
    </ControlContainer>
  );
};

export default PaddingControl;
