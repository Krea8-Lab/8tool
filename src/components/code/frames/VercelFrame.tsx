import {
  paddingOption,
  showBackgroundAtom,
} from "@/store";
import { themeDarkModeAtom } from "@/store/themes";
import { cn } from "@/utils/cn";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./VercelFrame.module.css";

const VercelFrame = () => {
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
      {!showBackgroundAtom() && (
        <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>
      )}
      <div class={styles.window}>
        <span class={styles.gridlinesHorizontal} data-grid></span>
        <span class={styles.gridlinesVertical} data-grid></span>
        <span class={styles.bracketLeft} data-grid></span>
        <span class={styles.bracketRight} data-grid></span>
        <Editor />
      </div>
    </div>
  );
};

export default VercelFrame;
