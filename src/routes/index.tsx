import tailwindDark from "@/assets/tailwind/dark.json";
import tailwindLight from "@/assets/tailwind/light.json";
import Controls from "@/components/code/Controls";
import ExportButton from "@/components/code/ExportButton";
import FormatCodeButton from "@/components/code/FormatCodeButton";
import Frame from "@/components/code/Frame";
import InfoDialog from "@/components/code/InfoDialog";
import { NavigationActions } from "@/components/navigation";
import { highlighterAtom, setHighlighter, initHashSync } from "@/store";
import { shikiTheme } from "@/store/themes";
import { LANGUAGES } from "@/util/languages";
import { Title, Meta } from "@solidjs/meta";
import type { Highlighter } from "shiki";
import { onMount, Show, createSignal } from "solid-js";

import styles from "@/components/code/code.module.css";

export default function Home() {
  const [mounted, setMounted] = createSignal(false);

  onMount(async () => {
    initHashSync();
    setMounted(true);

    try {
      const { createHighlighterCore, createOnigurumaEngine } = await import("shiki");
      const { default: getWasm } = await import("shiki/wasm");

      const hl = await createHighlighterCore({
        engine: createOnigurumaEngine(getWasm),
        themes: [shikiTheme, tailwindLight, tailwindDark],
        langs: [
          LANGUAGES.javascript.src(),
          LANGUAGES.tsx.src(),
          LANGUAGES.swift.src(),
          LANGUAGES.python.src(),
        ],
      });

      setHighlighter(hl as Highlighter);
    } catch (err) {
      console.error("Error initializing Shiki highlighter:", err);
    }
  });

  return (
    <>
      <Title>Create beautiful images of your code</Title>
      <Meta name="description" content="Turn your code into beautiful images." />
      <NavigationActions>
        <InfoDialog />
        <FormatCodeButton />
        <ExportButton />
      </NavigationActions>
      <div class={styles.app}>
        <Show when={mounted() && highlighterAtom()}>
          <Frame />
          <Controls />
        </Show>
      </div>
    </>
  );
}
