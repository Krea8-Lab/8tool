import beams from "@/assets/tailwind/beams.png";
import { paddingOption, showBackgroundAtom } from "@/store";
import { themeDarkModeAtom } from "@/store/themes";
import useIsSafari from "@/util/useIsSafari";
import { cn } from "@/utils/cn";

import Editor from "../Editor";

import sharedStyles from "./DefaultFrame.module.css";
import styles from "./TailwindFrame.module.css";

const TailwindFrame = () => {
  const isSafari = useIsSafari();

  return (
    <div
      class={cn(
        sharedStyles.frame,
        showBackgroundAtom() && styles.frame,
        !themeDarkModeAtom() && styles.frameLightMode,
        !showBackgroundAtom() && sharedStyles.noBackground,
        !showBackgroundAtom() && styles.noBackground,
        isSafari() && styles.isSafari,
      )}
      style={{ padding: `${paddingOption()}px` }}
    >
      {!showBackgroundAtom() && (
        <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>
      )}
      {showBackgroundAtom() && <img src={beams} alt="beams" class={styles.beams} />}
      <div class={styles.beams} />
      <div class={styles.window}>
        {showBackgroundAtom() && (
          <>
            <span class={styles.gridlinesHorizontal} data-grid></span>
            <span class={styles.gridlinesVertical} data-grid></span>
            <div class={styles.gradient}>
              <div>
                <div class={styles.gradient1}></div>
                <div class={styles.gradient2}></div>
              </div>
            </div>
          </>
        )}
        <div class={cn(sharedStyles.header, styles.header)}>
          <div class={sharedStyles.controls}>
            <div class={cn(sharedStyles.control, styles.control)}></div>
            <div class={cn(sharedStyles.control, styles.control)}></div>
            <div class={cn(sharedStyles.control, styles.control)}></div>
          </div>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default TailwindFrame;
