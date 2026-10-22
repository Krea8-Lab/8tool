import { paddingOption, showBackgroundAtom, fileNameAtom, setFileName } from "@/store";
import { selectedLanguageAtom } from "@/store/code";
import { flashShown } from "@/store/flash";
import { themeDarkModeAtom } from "@/store/themes";
import { cn } from "@/utils/cn";

import Editor from "../Editor";

import styles from "./CloudflareFrame.module.css";
import sharedStyles from "./DefaultFrame.module.css";

const CloudflareFrame = () => {
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
      <div class={styles.window}>
        <span class={styles.gridlinesHorizontal} data-grid></span>
        <span class={styles.gridlinesVertical} data-grid></span>
        {fileNameAtom().length > 0 ? (
          <div class={styles.header}>
            <div class={cn(sharedStyles.fileName, styles.fileName)} data-value={fileNameAtom()}>
              <input
                type="text"
                value={fileNameAtom()}
                onInput={(event) => setFileName(event.currentTarget.value)}
                spellcheck={false}
                tabIndex={-1}
                size={1}
              />
            </div>
            <span class={styles.language}>{selectedLanguageAtom()?.name}</span>
          </div>
        ) : flashShown() ? null : (
          <div class={styles.header} data-ignore-in-export>
            <div class={cn(sharedStyles.fileName, styles.fileName)} data-value={fileNameAtom()}>
              <input
                type="text"
                value={fileNameAtom()}
                onInput={(event) => setFileName(event.currentTarget.value)}
                spellcheck={false}
                tabIndex={-1}
                size={1}
              />
              <span>Untitled-1</span>
            </div>
            <span class={styles.language}>{selectedLanguageAtom()?.name}</span>
          </div>
        )}
        <Editor />
      </div>
    </div>
  );
};

export default CloudflareFrame;
