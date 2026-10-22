import {
  paddingOption,
  showBackgroundAtom,
  fileNameAtom,
  setFileName,
  subtitleAtom,
  setSubtitle,
  windowWidthAtom,
} from "@/store";
import {
  themeAtom,
  themeBackgroundAtom,
  themeDarkModeAtom,
} from "@/store/themes";
import { selectedLanguageAtom, codeAtom } from "@/store/code";
import { flashShown } from "@/store/flash";
import { cn } from "@/utils/cn";
import { createEffect, createSignal, onMount, onCleanup } from "solid-js";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./ElevenLabsFrame.module.css";

export const ElevenLabsFrame = () => {
  let windowRef: HTMLDivElement | undefined;
  const [circleDiameter, setCircleDiameter] = createSignal(0);
  const [isTransitioning, setIsTransitioning] = createSignal(false);
  const numberOfLines = () => Math.max(1, (codeAtom().match(/\n/g) || []).length + 1);

  onMount(() => {
    const updateCircleSize = () => {
      if (windowRef) {
        const boxWidth = windowRef.offsetWidth;
        const boxHeight = windowRef.offsetHeight;
        const diagonal = Math.sqrt(Math.pow(boxWidth, 2) + Math.pow(boxHeight, 2));
        setCircleDiameter(diagonal);
      }
    };

    updateCircleSize();
    const timeoutId = setTimeout(updateCircleSize, 0);

    window.addEventListener("resize", updateCircleSize);
    onCleanup(() => {
      window.removeEventListener("resize", updateCircleSize);
      clearTimeout(timeoutId);
    });
  });

  createEffect(() => {
    windowWidthAtom();
    numberOfLines();
    paddingOption();

    const startId = setTimeout(() => setIsTransitioning(true), 0);
    const endId = setTimeout(() => setIsTransitioning(false), 200);
    onCleanup(() => {
      clearTimeout(startId);
      clearTimeout(endId);
    });
  });

  return (
    <div
      class={cn(
        sharedStyles.frame,
        showBackgroundAtom() && styles.frame,
        showBackgroundAtom() && !themeDarkModeAtom() && styles.frameLightMode,
        !showBackgroundAtom() && sharedStyles.noBackground,
        !showBackgroundAtom() && styles.noBackground,
      )}
      style={{ padding: `${paddingOption()}px` }}
    >
      {!showBackgroundAtom() && <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>}
      <div class={styles.window} ref={windowRef}>
        <span
          class={cn(styles.circle, isTransitioning() && styles.isTransitioning)}
          style={{
            width: `${circleDiameter()}px`,
            height: `${circleDiameter()}px`,
          }}
        ></span>

        <span class={styles.gridlineHorizontalTop} data-grid></span>
        <span class={styles.gridlineHorizontalCenter} data-grid></span>
        <span class={styles.gridlineHorizontalBottom} data-grid></span>

        <span class={styles.gridlineVerticalLeft} data-grid></span>
        <span class={styles.gridlineVerticalCenter} data-grid></span>
        <span class={styles.gridlineVerticalRight} data-grid></span>

        <span class={styles.dotTopLeft} data-dot></span>
        <span class={styles.dotTopRight} data-dot></span>
        <span class={styles.dotBottomLeft} data-dot></span>
        <span class={styles.dotBottomRight} data-dot></span>

        <span class={styles.gridlineCornerTopLeft} data-grid></span>
        <span class={styles.gridlineCornerTopRight} data-grid></span>
        <span class={styles.gridlineCornerBottomRight} data-grid></span>
        <span class={styles.gridlineCornerBottomLeft} data-grid></span>

        <div class={styles.editor}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default ElevenLabsFrame;
