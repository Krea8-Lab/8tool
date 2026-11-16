import { Title, Meta } from "@solidjs/meta";
import type { Highlighter } from "shiki";
import { onMount, Show, createSignal } from "solid-js";
import tailwindDark from "~/apps/code/assets/tailwind/dark.json";
import tailwindLight from "~/apps/code/assets/tailwind/light.json";
import { highlighterAtom, setHighlighter, initHashSync } from "~/apps/code/store";
import { shikiTheme } from "~/apps/code/store/themes";
import { LANGUAGES } from "~/apps/code/util/languages";
import Controls from "~/components/code/Controls";
import ExportButton from "~/components/code/ExportButton";
import FormatCodeButton from "~/components/code/FormatCodeButton";
import Frame from "~/components/code/Frame";
import InfoDialog from "~/components/code/InfoDialog";
import { NavigationActions } from "~/components/navigation";

import styles from "~/components/code/code.module.css";

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
      <div class={`text-foreground ${styles.app}`}>
        <Show when={mounted() && highlighterAtom()}>
          <Frame />
          <Controls />
        </Show>
      </div>
    </>
  );
}
