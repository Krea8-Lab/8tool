import { flashMessage, flashShown } from "@/store/flash";
import useAudio from "@/util/useAudio";
import { cn } from "@/utils/cn";
import { createEffect, Show } from "solid-js";

import styles from "./FlashMessage.module.css";

export const FlashMessage = () => {
  const [, toggle] = useAudio("unlock.mp3");

  createEffect(() => {
    const msg = flashMessage();
    if (msg?.variant === "unlock" && flashShown()) {
      toggle();
    }
  });

  return (
    <Show when={flashShown()}>
      {flashMessage().variant === "unlock" ? (
        <div class={styles.unlockContainer}>
          <div class={styles.coin}>
            <div class={cn(styles.coinFront, styles.coinSide)}>{flashMessage().icon}</div>
            <div class={cn(styles.coinBack, styles.coinSide)}>{flashMessage().icon}</div>
          </div>
          <span class={styles.unlockFlash}>{flashMessage().message}</span>
        </div>
      ) : (
        <div class={styles.container}>
          <span class={styles.flash}>
            {flashMessage().icon}
            {flashMessage().message}
          </span>
        </div>
      )}
    </Show>
  );
};

export default FlashMessage;
