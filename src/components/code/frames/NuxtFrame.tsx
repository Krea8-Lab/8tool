import {
  paddingOption,
  showBackgroundAtom,
} from "@/store";
import { themeDarkModeAtom } from "@/store/themes";
import { cn } from "@/utils/cn";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./NuxtFrame.module.css";

const NuxtFrame = () => {
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
      {!showBackgroundAtom() && (
        <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>
      )}
      <img src="/stars.svg" alt="stars" class={styles.stars} />
      <div class={styles.window}>
        <span data-frameborder />
        <span data-frameborder />
        <span data-frameborder />
        <Editor />
      </div>
    </div>
  );
};

export default NuxtFrame;
