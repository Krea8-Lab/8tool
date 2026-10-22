import {
  paddingOption,
  showBackgroundAtom,
  fileNameAtom,
  setFileName,
  subtitleAtom,
} from "@/store";
import { themeDarkModeAtom } from "@/store/themes";
import { selectedLanguageAtom } from "@/store/code";
import { cn } from "@/utils/cn";

import useIsSafari from "@/util/useIsSafari";

import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./Auth0Frame.module.css";

const Auth0Frame = () => {
  const isSafari = useIsSafari();

  const subtitleFallback = selectedLanguageAtom()?.name ?? "Plain Text";
  const subtitleDisplayValue = subtitleAtom() || subtitleFallback;

  return (
    <div
      class={cn(
        sharedStyles.frame,
        styles.frame,
        !themeDarkModeAtom() && styles.frameLightMode,
        showBackgroundAtom() && styles.withBackground,
        !showBackgroundAtom() && sharedStyles.noBackground,
        isSafari() && styles.isSafari,
      )}
      style={{ padding: `${paddingOption()}px` }}
    >
      {!showBackgroundAtom() && (
        <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>
      )}

      <div class={styles.shell}>
        {showBackgroundAtom() && (
          <>
            <span class={styles.gridlinesHorizontal} data-grid></span>
            <span class={styles.gridlinesVertical} data-grid></span>
          </>
        )}
        <div class={styles.toolbar}>
          <div class={styles.controls}>
            <span class={styles.control}></span>
            <span class={styles.control}></span>
            <span class={styles.control}></span>
          </div>
          <div class={styles.badge} data-value={fileNameAtom()}>
            <input
              type="text"
              value={fileNameAtom()}
              onInput={(event) => setFileName(event.currentTarget.value)}
              spellcheck={false}
              tabIndex={-1}
              size={1}
            />
            {fileNameAtom().length === 0 ? <span data-ignore-in-export>Untitled</span> : null}
          </div>
          <div class={styles.runtime} data-value={subtitleDisplayValue}>
            <span>{subtitleFallback}</span>
          </div>
        </div>

        <div class={styles.window}>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Auth0Frame;
