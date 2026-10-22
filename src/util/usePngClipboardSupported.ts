import { createSignal, onMount } from "solid-js";
import { isServer } from "solid-js/web";

export default function usePngClipboardSupported() {
  const [supported, setSupported] = createSignal(false);

  onMount(() => {
    if (!isServer && window.navigator && window.navigator.clipboard && typeof ClipboardItem === "function") {
      setSupported(true);
    }
  });

  return supported;
}
