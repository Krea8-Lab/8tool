import { createSignal, JSX } from "solid-js";

export type FlashMessage = {
  icon?: JSX.Element;
  message: string;
  variant?: "info" | "unlock";
  timeout?: number;
};

export const [flashShown, setFlashShown] = createSignal(false);
export const [flashMessage, setFlashMessage] = createSignal<FlashMessage>({
  message: "",
  variant: "info",
});

let timeoutHandle: number | undefined;

export function triggerFlash(msg: FlashMessage) {
  if (timeoutHandle) {
    window.clearTimeout(timeoutHandle);
  }

  setFlashMessage(msg);
  setFlashShown(true);

  if (msg.timeout) {
    timeoutHandle = window.setTimeout(() => {
      setFlashShown(false);
      setFlashMessage({ message: "", variant: "info" });
    }, msg.timeout);
  }
}
