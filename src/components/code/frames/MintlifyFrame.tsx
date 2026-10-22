import mintlifyPatternDark from "@/assets/mintlify-pattern-dark.svg?url";
import mintlifyPatternLight from "@/assets/mintlify-pattern-light.svg?url";
import { paddingOption, showBackgroundAtom, fileNameAtom, setFileName } from "@/store";
import { themeDarkModeAtom } from "@/store/themes";
import { cn } from "@/utils/cn";

import Editor from "../Editor";

import sharedStyles from "./DefaultFrame.module.css";
import styles from "./MintlifyFrame.module.css";

const MintlifyFrame = () => {
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
        <span class={styles.patternWrapper}>
          <img
            src={themeDarkModeAtom() ? mintlifyPatternDark : mintlifyPatternLight}
            alt=""
            class={styles.pattern}
          />
        </span>
      )}
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
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default MintlifyFrame;
