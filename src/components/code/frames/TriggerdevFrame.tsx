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







import triggerPattern from "@/assets/triggerdev/pattern.svg?url";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./TriggerdevFrame.module.css";

const TriggerdevFrame = () => {
  
  
  
  
  
  
  

  return (
    <div
      class={cn(
        sharedStyles.frame,
        showBackgroundAtom() && styles.frame,
        !themeDarkModeAtom() && styles.frameLightMode,
        !showBackgroundAtom() && sharedStyles.noBackground,
        !showBackgroundAtom() && styles.noBackground,
      )}
      style={{ padding: `${paddingOption()}px`, "background-image": showBackgroundAtom() && themeDarkModeAtom() ? themeBackgroundAtom() : "" }}
    >
      {!showBackgroundAtom() && <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>}
      {showBackgroundAtom() && (
        <>
          <div class={styles.patternTop} style={{ "background-image": `url(${triggerPattern})` }} />
          <div class={styles.patternBottom} style={{ "background-image": `url(${triggerPattern})` }} />
        </>
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

export default TriggerdevFrame;
