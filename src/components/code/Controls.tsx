import BackgroundControl from "./BackgroundControl";
import DarkModeControl from "./DarkModeControl";
import LanguageControl from "./LanguageControl";
import LineNumberControl from "./LineNumberControl";
import PaddingControl from "./PaddingControl";
import ThemeControl from "./ThemeControl";

import styles from "./Controls.module.css";

export const Controls = () => {
  return (
    <div class={styles.controls}>
      <ThemeControl />
      <BackgroundControl />
      <DarkModeControl />
      <LineNumberControl />
      <PaddingControl />
      <LanguageControl />
    </div>
  );
};

export default Controls;
