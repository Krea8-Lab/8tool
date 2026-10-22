import { paddingOption, showBackgroundAtom } from "@/store";
import { themeDarkModeAtom } from "@/store/themes";
import { cn } from "@/utils/cn";

import Editor from "../Editor";

import sharedStyles from "./DefaultFrame.module.css";
import styles from "./OpenAIFrame.module.css";

const OpenAIFrame = () => {
  return (
    <div
      class={cn(
        styles.frame,
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
        <Editor />
      </div>
    </div>
  );
};

export default OpenAIFrame;
