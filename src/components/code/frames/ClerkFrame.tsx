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





import clerkPattern from "@/assets/clerk/pattern.svg?url";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./ClerkFrame.module.css";

const ClerkFrame = () => {
  
  
  

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
      {!showBackgroundAtom() && <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>}
      {showBackgroundAtom() && <img src={clerkPattern} alt="" class={styles.pattern} />}
      <div class={styles.window}>
        <div class={styles.code}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default ClerkFrame;
