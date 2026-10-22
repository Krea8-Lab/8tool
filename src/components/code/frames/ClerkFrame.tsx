import clerkPattern from "@/assets/clerk/pattern.svg?url";
import { paddingOption, showBackgroundAtom } from "@/store";
import { themeDarkModeAtom } from "@/store/themes";
import { cn } from "@/utils/cn";

import Editor from "../Editor";

import styles from "./ClerkFrame.module.css";
import sharedStyles from "./DefaultFrame.module.css";

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
      {!showBackgroundAtom() && (
        <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>
      )}
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
