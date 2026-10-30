import { createSignal, onMount } from "solid-js";
import { isServer } from "solid-js/web";

export default function useIsSafari() {
  const [isSafari, setSafari] = createSignal(false);

  onMount(() => {
    if (!isServer) {
      const safari =
        navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") <= -1;
      setSafari(safari);
    }
  });

  return isSafari;
}
