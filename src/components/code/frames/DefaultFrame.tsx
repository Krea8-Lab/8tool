import { paddingOption, showBackgroundAtom, fileNameAtom, setFileName } from "@/store";
import { themeAtom, themeBackgroundAtom, themeDarkModeAtom } from "@/store/themes";
import useIsSafari from "@/util/useIsSafari";
import { cn } from "@/utils/cn";

import Editor from "../Editor";

import styles from "./DefaultFrame.module.css";

const DefaultFrame = () => {
  const isSafari = useIsSafari();

  return (
    <div
      class={cn(
        styles.frame,
        styles[themeAtom().id],
        themeDarkModeAtom() && styles.darkMode,
        showBackgroundAtom() && styles.withBackground,
      )}
      style={{
        padding: `${paddingOption()}px`,
        "background-image": showBackgroundAtom() ? themeBackgroundAtom() : "",
      }}
    >
      {!showBackgroundAtom() && <div data-ignore-in-export class={styles.transparentPattern}></div>}
      <div
        class={cn(styles.window, {
          [styles.withBorder]: !isSafari(),
          [styles.withShadow]: !isSafari() && showBackgroundAtom(),
        })}
      >
        <div class={styles.header}>
          <div class={styles.controls}>
            <div class={styles.control}></div>
            <div class={styles.control}></div>
            <div class={styles.control}></div>
          </div>
          <div class={styles.fileName}>
            <input
              type="text"
              value={fileNameAtom()}
              onInput={(event) => setFileName(event.currentTarget.value)}
              spellcheck={false}
              tabIndex={-1}
            />
            {fileNameAtom().length === 0 ? <span data-ignore-in-export>Untitled-1</span> : null}
          </div>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default DefaultFrame;
