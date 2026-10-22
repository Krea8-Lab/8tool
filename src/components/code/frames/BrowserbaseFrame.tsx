import {
  paddingOption,
  showBackgroundAtom,
  fileNameAtom,
  setFileName,
} from "@/store";
import { themeDarkModeAtom } from "@/store/themes";
import { cn } from "@/utils/cn";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./BrowserbaseFrame.module.css";

const BrowserbaseFrame = () => {
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
    >
      {!showBackgroundAtom() && (
        <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>
      )}
      {showBackgroundAtom() && (
        <div class={styles.background}>
          <div class={styles.backgroundGridline}></div>
          <div class={styles.backgroundGridline}></div>
          <div class={styles.backgroundGridline}></div>
          <div class={styles.backgroundGridline}></div>
          <div class={styles.backgroundGridline}></div>
          <div class={styles.backgroundGridline}></div>
          <div class={styles.backgroundGridline}></div>
        </div>
      )}
      <div class={styles.window}>
        <div class={cn(sharedStyles.header, styles.header)}>
          <div class={sharedStyles.controls}>
            <div class={sharedStyles.control}></div>
            <div class={sharedStyles.control}></div>
            <div class={sharedStyles.control}></div>
          </div>
          <div class={sharedStyles.fileName}>
            <input
              type="text"
              value={fileNameAtom()}
              onInput={(event) => setFileName(event.currentTarget.value)}
              spellcheck={false}
              tabIndex={-1}
            />
            {fileNameAtom().length === 0 ? <span data-ignore-in-export>Untitled-1</span> : null}
          </div>
          <div />
        </div>
        <Editor />
      </div>
      <div class={styles.outline} style={{ padding: `${paddingOption()}px` }}></div>
    </div>
  );
};

export default BrowserbaseFrame;
