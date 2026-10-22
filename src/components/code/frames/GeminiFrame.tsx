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






import useIsSafari from "@/util/useIsSafari";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./GeminiFrame.module.css";

const GeminiFrame = () => {
  
  
  
  
  const isSafari = useIsSafari();
  

  return (
    <div
      class={cn(
        sharedStyles.frame,
        styles.frame,
        !themeDarkModeAtom() && styles.frameLightMode,
        !showBackgroundAtom() && sharedStyles.noBackground,
        !showBackgroundAtom() && styles.noBackground,
        isSafari() && styles.isSafari,
      )}
      style={{ padding: `${paddingOption()}px` }}
    >
      {!showBackgroundAtom() && <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>}
      {showBackgroundAtom() && <img src="/stars.svg" alt="stars" class={styles.stars} />}
      <div class={styles.window}>
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
          </div>
        )}

        <div>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default GeminiFrame;
