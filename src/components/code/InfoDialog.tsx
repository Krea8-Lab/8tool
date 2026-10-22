import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { Info02Icon } from "@/components/icons";
import { Shortcut } from "@/components/kbd";
import { SocialFooter } from "@/components/social-footer";
import usePngClipboardSupported from "@/util/usePngClipboardSupported";
import useHotkeys from "@/utils/useHotkeys";
import { createSignal } from "solid-js";

export function InfoDialog() {
  const [isOpen, setIsOpen] = createSignal(false);
  const toggleOpen = () => setIsOpen(!isOpen());
  const pngClipboardSupported = usePngClipboardSupported();

  useHotkeys("shift+/", toggleOpen);

  return (
    <Dialog open={isOpen()} onOpenChange={setIsOpen}>
      <DialogTrigger class="hidden md:inline-flex">
        <Button variant="transparent" class="gap-2">
          <Info02Icon width={16} height={16} /> <span>About</span>
        </Button>
      </DialogTrigger>
      <DialogContent size="large">
        <div class="flex gap-8">
          <div class="flex flex-1 flex-col gap-3 text-[13px] leading-relaxed text-gray-11">
            <DialogTitle>About</DialogTitle>
            <p>
              This tool is a customized fork of Raycast’s code snippet tool (
              <a
                href="https://github.com/raycast/ray-so"
                target="_blank"
                rel="noopener"
                class="text-gray-12 underline underline-offset-2"
              >
                ray.so
              </a>
              ). I forked it to fine-tune the aesthetics, add custom adjustments, and extend the
              experience according to my own point of view.
            </p>
            <p>
              Pick a theme from a range of syntax colors and backgrounds, select your language,
              toggle between light or dark mode, and customize your layout.
            </p>
            <p>
              When ready, click export image to save your snippet as a PNG or SVG, or copy it
              directly to your clipboard.
            </p>
            <h2 class="text-base font-medium text-gray-12">Credits & Source</h2>
            <ul>
              <li>
                {" "}
                Original project by{" "}
                <a
                  href="https://github.com/raycast/ray-so"
                  target="_blank"
                  rel="noopener"
                  class="text-gray-12 underline underline-offset-2"
                >
                  <em>Raycast</em>
                </a>
                .
              </li>
              <li>
                {" "}
                Forked and maintained by{" "}
                <a
                  href="https://github.com/Krea8-Lab"
                  target="_blank"
                  rel="noopener"
                  class="text-gray-12 underline underline-offset-2"
                >
                  <em>Krea8</em>
                </a>
                .
              </li>
            </ul>
            <SocialFooter referral="code-image" />
          </div>

          <div class="h-full w-px bg-gray-a3" />

          <div class="flex flex-1 flex-col gap-2">
            <h2 class="-mt-[3px] font-medium text-gray-12">Shortcuts</h2>
            <div class="flex flex-col gap-2">
              <Shortcut keys={["F"]}>Focus text editor</Shortcut>
              <Shortcut keys={["Esc"]}>Unfocus text editor</Shortcut>
              <Shortcut keys={["C"]}>Change colors</Shortcut>
              <Shortcut keys={["B"]}>Toggle background</Shortcut>
              <Shortcut keys={["D"]}>Toggle dark mode</Shortcut>
              <Shortcut keys={["N"]}>Toggle line numbers</Shortcut>
              <Shortcut keys={["P"]}>Change padding</Shortcut>
              <Shortcut keys={["L"]}>Select language</Shortcut>
              <Shortcut keys={["⌥", "click"]}>Highlight line</Shortcut>
              <Shortcut keys={["⌥", "shift", "F"]}>Format code</Shortcut>
              <Shortcut keys={["⌘", "K"]}>Toggle Export Menu</Shortcut>
              <Shortcut keys={["⌘", "S"]}>Save PNG</Shortcut>
              <Shortcut keys={["⌘", "⇧", "S"]}>Save SVG</Shortcut>
              {pngClipboardSupported() && <Shortcut keys={["⌘", "C"]}>Copy image</Shortcut>}
              <Shortcut keys={["⌘", "⇧", "C"]}>Copy URL</Shortcut>
              <Shortcut keys={["?"]}>Open shortcuts</Shortcut>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InfoDialog;
