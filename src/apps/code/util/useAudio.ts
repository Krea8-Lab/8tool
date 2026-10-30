import { createSignal, onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";

const useAudio = (path: string): [() => boolean, () => void] => {
  if (isServer) {
    return [() => false, () => {}];
  }

  const audio = new Audio(`/${path}`);
  const [playing, setPlaying] = createSignal(false);

  const toggle = () => {
    const next = !playing();
    setPlaying(next);
    if (next) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  onMount(() => {
    const handleEnd = () => setPlaying(false);
    audio.addEventListener("ended", handleEnd);
    onCleanup(() => {
      audio.removeEventListener("ended", handleEnd);
      audio.pause();
    });
  });

  return [playing, toggle];
};

export default useAudio;
