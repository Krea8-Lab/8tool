import {
  paddingOption,
  showBackgroundAtom,
} from "@/store";
import { themeDarkModeAtom } from "@/store/themes";
import { cn } from "@/utils/cn";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./AwsFrame.module.css";

const AwsFrame = () => {
  return (
    <div
      class={cn(
        styles.frame,
        showBackgroundAtom() && styles.awsFrame,
        showBackgroundAtom() && !themeDarkModeAtom() && styles.awsFrameLightMode,
        !showBackgroundAtom() && sharedStyles.noBackground,
        !showBackgroundAtom() && styles.noBackground,
      )}
      style={{ padding: `${paddingOption()}px` }}
    >
      {!showBackgroundAtom() && (
        <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>
      )}
      <div class={styles.awsWindow}>
        <span class={styles.awsGridlinesHorizontal} data-grid></span>
        <span class={styles.awsGridlinesVertical} data-grid></span>
        <span class={styles.awsBracketLeft} data-grid></span>
        <span class={styles.awsBracketRight} data-grid></span>
        <Editor />
      </div>
    </div>
  );
};

export default AwsFrame;
