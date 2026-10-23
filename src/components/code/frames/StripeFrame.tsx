import { paddingOption, showBackgroundAtom, windowWidthAtom } from "@/store";
import { code } from "@/store/code";
import { themeDarkModeAtom } from "@/store/themes";
import useIsSafari from "@/util/useIsSafari";
import { cn } from "@/utils/cn";
import { createSignal, createEffect } from "solid-js";

import Editor from "../Editor";

import sharedStyles from "./DefaultFrame.module.css";
import styles from "./StripeFrame.module.css";

const StripeFrame = () => {
  const isSafari = useIsSafari();

  let windowRef: HTMLDivElement | undefined;
  let frameRef: HTMLDivElement | undefined;
  const [innerWindowWidth, setInnerWindowWidth] = createSignal(0);
  const [frameHeight, setFrameHeight] = createSignal(0);
  const [isTransitioning, setIsTransitioning] = createSignal(false);
  const numberOfLines = Math.max(1, (code().match(/\n/g) || []).length + 1);

  createEffect(() => {
    const updateDimensions = () => {
      if (windowRef) {
        setInnerWindowWidth(windowRef.offsetWidth);
      }
      if (frameRef) {
        setFrameHeight(frameRef.offsetHeight);
      }
    };

    updateDimensions();

    const timeoutId = setTimeout(updateDimensions, 0);

    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timeoutId);
    };
  }, [windowWidthAtom, numberOfLines, paddingOption, isTransitioning]);

  // Handle re-trigger when padding has finished changing
  createEffect(() => {
    const startId = setTimeout(() => setIsTransitioning(true), 0);
    const endId = setTimeout(() => setIsTransitioning(false), 200);
    return () => {
      clearTimeout(startId);
      clearTimeout(endId);
    };
  }, [paddingOption]);

  return (
    <div
      class={cn(
        sharedStyles.frame,
        showBackgroundAtom() && styles.frame,
        !themeDarkModeAtom() && styles.frameLightMode,
        !showBackgroundAtom() && sharedStyles.noBackground,
        !showBackgroundAtom() && styles.noBackground,
      )}
      style={{ padding: `${paddingOption()}px` }}
      ref={frameRef}
    >
      {!showBackgroundAtom() && (
        <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>
      )}
      {showBackgroundAtom() && (
        <div class={styles.background}>
          <div
            class={styles.backgroundGridlineContainer}
            style={{ "--window-width": `${innerWindowWidth()}px` }}
          >
            <div class={styles.backgroundGridline}></div>
            <div class={styles.backgroundGridline}></div>
            <div class={styles.backgroundGridline}></div>
            <div class={styles.backgroundGridline}></div>
            <div class={styles.backgroundGridline}></div>
          </div>

          <div class={cn(styles.stripe)}>
            <div
              class={styles.backgroundGridlineContainer}
              style={{ "--window-width": `${innerWindowWidth()}px` }}
            >
              <div class={styles.backgroundGridline}></div>
              <div class={styles.backgroundGridline}></div>
              <div class={styles.backgroundGridline}></div>
              <div class={styles.backgroundGridline}></div>
              <div class={styles.backgroundGridline}></div>

              <div class={cn(styles.set, frameHeight() < 240 && styles.isSmall)}>
                <div class={styles.layer1} />
                <div class={styles.layer2} />
                <div class={styles.intersection} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div class={cn(styles.window, isSafari() && styles.isSafari)} ref={windowRef}>
        <Editor />
      </div>
    </div>
  );
};

export default StripeFrame;
