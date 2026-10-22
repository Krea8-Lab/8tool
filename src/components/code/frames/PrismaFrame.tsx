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
import styles from "./PrismaFrame.module.css";

const PrismaFrame = () => {
  
  
  
  
  

  return (
    <div
      class={cn(
        sharedStyles.frame,
        styles.frame,
        !themeDarkModeAtom() && styles.frameLightMode,
        !showBackgroundAtom() && sharedStyles.noBackground,
        !showBackgroundAtom() && styles.noBackground,
      )}
      style={{ padding: `${paddingOption()}px` }}
    >
      {!showBackgroundAtom() && <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>}
      <div class={styles.window}>
        <span data-frameborder />
        <span data-frameborder />
        <span data-frameborder />
        <span data-frameborder />
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
        <Editor />
      </div>
    </div>
  );
};

export default PrismaFrame;
