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

import { createSignal, createEffect, onMount, onCleanup, JSX } from "solid-js";





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
      {!showBackgroundAtom() && <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>}
      <div class={styles.window}>
        <Editor />
      </div>
    </div>
  );
};

export default OpenAIFrame;
