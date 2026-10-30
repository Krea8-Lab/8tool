import Drawer, {
  DrawerBackdrop,
  DrawerContent,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";
import BackgroundControl from "./BackgroundControl";
import DarkModeControl from "./DarkModeControl";
import LanguageControl from "./LanguageControl";
import LineNumberControl from "./LineNumberControl";
import PaddingControl from "./PaddingControl";
import ThemeControl from "./ThemeControl";

import styles from "./Controls.module.css";

export const Controls = () => {
  // Add Mobile Drawer for controls
  return (
    <>
      <div class={`sm:hidden fixed bottom-2 left-2`}>
        <Drawer>
          <DrawerTrigger>Controls</DrawerTrigger>
          <DrawerBackdrop />
          <DrawerPositioner>
            <DrawerContent class="max-h-[65svh]">
              <DrawerGrabber>
                <DrawerGrabberIndicator />
              </DrawerGrabber>
              <DrawerTitle class="border-b border-white/50">Controls</DrawerTitle>
              <div class="flex flex-col gap-2">
                <ThemeControl />
                <BackgroundControl />
                <DarkModeControl />
                <LineNumberControl />
                <PaddingControl />
                <LanguageControl />
              </div>
            </DrawerContent>
          </DrawerPositioner>
        </Drawer>
      </div>
      <div class={`sm:flex hidden ${styles.controls}`}>
        <ThemeControl />
        <BackgroundControl />
        <DarkModeControl />
        <LineNumberControl />
        <PaddingControl />
        <LanguageControl />
      </div>
    </>
  );
};

export default Controls;
