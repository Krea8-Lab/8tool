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







import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./ResendFrame.module.css";

const ResendFrame = () => {
  
  
  
  
  

  return (
    <div
      class={cn(
        sharedStyles.frame,
        styles.frame,
        themeDarkModeAtom() && styles.darkMode,
        showBackgroundAtom() && styles.withBackground,
      )}
      style={{ padding: `${paddingOption()}px` }}
    >
      {!showBackgroundAtom() && <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>}
      <div class={styles.window}>
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
            {fileNameAtom().length === 0 ? <span>Untitled-1</span> : null}
          </div>
          <span class={styles.language}>{selectedLanguageAtom()?.name}</span>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default ResendFrame;
