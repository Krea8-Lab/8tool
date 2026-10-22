import ArrowsExpandingIcon from "@/assets/icons/arrows-expanding-16.svg";
import ChevronDownIcon from "@/assets/icons/chevron-down-16.svg";
import ClipboardIcon from "@/assets/icons/clipboard-16.svg";
import ImageIcon from "@/assets/icons/image-16.svg";
import LinkIcon from "@/assets/icons/link-16.svg";
import { Button } from "@/components/button";
import { ButtonGroup } from "@/components/button-group";
import { ChevronRightIcon, CircleIcon, DownloadIcon } from "@/components/icons";
import { Kbd, KbdGroup } from "@/components/kbd";
import { toast } from "@/components/toast";
import { toPng, toSvg, toBlob } from "@/lib/image";
import { frameRef, fileNameAtom, setFlashShown } from "@/store";
import { triggerFlash } from "@/store/flash";
import { EXPORT_SIZE_OPTIONS, SIZE_LABELS, exportSize, setExportSize } from "@/store/image";
import download from "@/util/download";
import usePngClipboardSupported from "@/util/usePngClipboardSupported";
import useHotkeys from "@/utils/useHotkeys";
import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createSignal, createUniqueId, onMount, Show, For } from "solid-js";
import { Portal } from "solid-js/web";

export const ExportButton = () => {
  const [dropdownOpen, setDropdownOpen] = createSignal(false);
  const pngClipboardSupported = usePngClipboardSupported();

  const getFileName = () => {
    const custom = fileNameAtom();
    return custom.replaceAll(" ", "-") || "ray-so-export";
  };

  const savePng = async () => {
    const frame = frameRef();
    if (!frame) {
      toast.error("Couldn't find a frame to export");
      return;
    }

    triggerFlash({ icon: <ImageIcon />, message: "Exporting PNG" });

    try {
      const dataUrl = await toPng(frame, {
        pixelRatio: exportSize(),
      });

      if (!dataUrl || dataUrl === "data:," || dataUrl.length < 100) {
        throw new Error(
          "Canvas data extraction blocked or produced empty image. Please allow canvas permissions in your browser.",
        );
      }

      download(dataUrl, `${getFileName()}.png`);
    } catch (err: any) {
      console.error("Failed to export PNG:", err);
      toast.error(
        err?.message ||
          "Export failed. If using Firefox/LibreWolf, allow canvas data extraction in your browser address bar.",
      );
    } finally {
      setFlashShown(false);
    }
  };

  const copyPng = async () => {
    triggerFlash({ icon: <ClipboardIcon />, message: "Copying PNG" });
    const frame = frameRef();
    if (!frame) {
      setFlashShown(false);
      toast.error("Couldn't find a frame to export");
      return;
    }

    try {
      const blob = await toBlob(frame, {
        pixelRatio: exportSize(),
      });

      if (!blob || blob.size < 100) {
        throw new Error(
          "Canvas data extraction blocked or produced empty image. Please allow canvas permissions in your browser.",
        );
      }

      const clipboardItem = new ClipboardItem({
        "image/png": blob,
      });

      await navigator.clipboard.write([clipboardItem]);
      triggerFlash({
        icon: <ClipboardIcon />,
        message: "PNG Copied to clipboard!",
        timeout: 2000,
      });
    } catch (err: any) {
      console.error("Failed to copy PNG to clipboard:", err);
      setFlashShown(false);
      toast.error(
        err?.message || "Failed to copy image. Check browser canvas/clipboard permissions.",
      );
    }
  };

  const saveSvg = async () => {
    const frame = frameRef();
    if (!frame) {
      toast.error("Couldn't find a frame to export");
      return;
    }

    triggerFlash({ icon: <ImageIcon />, message: "Exporting SVG" });
    try {
      const dataUrl = await toSvg(frame);
      download(dataUrl, `${getFileName()}.svg`);
    } catch (err: any) {
      console.error("Failed to export SVG:", err);
      toast.error("Failed to export SVG");
    } finally {
      setFlashShown(false);
    }
  };

  const copyUrl = async () => {
    triggerFlash({ icon: <ClipboardIcon />, message: "Copying URL" });
    const url = window.location.toString();
    let urlToCopy = url;

    try {
      const encodedUrl = encodeURIComponent(url);
      const response = await fetch(`/api/shorten-url?url=${encodedUrl}&ref=codeImage`).then((res) =>
        res.json(),
      );
      if (response.link) {
        urlToCopy = response.link;
      }
    } catch {}

    navigator.clipboard.writeText(urlToCopy);
    triggerFlash({
      icon: <ClipboardIcon />,
      message: "URL Copied to clipboard!",
      timeout: 2000,
    });
  };

  const handleExportClick = (event: MouseEvent) => {
    event.preventDefault();
    savePng();
  };

  // 1. Root Menu Machine
  const rootService = useMachine(menu.machine, () => ({
    id: createUniqueId(),
    open: dropdownOpen(),
    onOpenChange(details) {
      setDropdownOpen(details.open);
    },
    positioning: {
      placement: "bottom-end",
      gutter: 4,
    },
    onSelect(details) {
      switch (details.value) {
        case "save-png":
          savePng();
          break;
        case "save-svg":
          saveSvg();
          break;
        case "copy-png":
          copyPng();
          break;
        case "copy-url":
          copyUrl();
          break;
      }
    },
  }));
  const rootApi = createMemo(() => menu.connect(rootService, normalizeProps));

  // 2. Submenu (Size) Machine
  const subService = useMachine(menu.machine, () => ({
    id: createUniqueId(),
    "aria-label": "Size",
    onSelect(details) {
      const size = Number(details.value);
      if (!isNaN(size)) {
        setExportSize(size as any);
      }
    },
  }));
  const subApi = createMemo(() => menu.connect(subService, normalizeProps));

  // 3. Establish Parent-Child Relationship (Zag.js Nested Menu)
  onMount(() => {
    rootApi().setChild(subService);
    subApi().setParent(rootService);
  });

  useHotkeys("mod+k", (event) => {
    event.preventDefault();
    rootApi().setOpen(!rootApi().open);
  });

  useHotkeys("mod+s", (event) => {
    event.preventDefault();
    savePng();
  });

  useHotkeys("mod+c", (event) => {
    if (pngClipboardSupported()) {
      event.preventDefault();
      copyPng();
    }
  });

  useHotkeys("mod+shift+c", (event) => {
    event.preventDefault();
    copyUrl();
  });

  useHotkeys("mod+shift+s", (event) => {
    event.preventDefault();
    saveSvg();
  });

  return (
    <ButtonGroup>
      <Button onClick={handleExportClick} variant="primary" aria-label="Export as PNG">
        <DownloadIcon class="h-4 w-4" />
        <span>Export</span> <span class="hidden md:inline-block">Image</span>
      </Button>
      <Button
        {...rootApi().getTriggerProps()}
        variant="primary"
        aria-label="See other export options"
        class="px-2"
      >
        <ChevronDownIcon />
      </Button>

      <Show when={rootApi().open}>
        {/* Root Menu Content */}
        <Portal>
          <div {...rootApi().getPositionerProps()} class="z-50">
            <div
              {...rootApi().getContentProps()}
              class="animate-slideDownAndFade z-50 min-w-[9.5rem] overflow-hidden rounded-md border border-gray-4 bg-panel p-1 shadow-md outline-none"
            >
              <div
                {...rootApi().getItemProps({ value: "save-png" })}
                class="relative flex cursor-default items-center rounded px-2 py-1.5 text-sm text-gray-11 transition-colors outline-none select-none hover:bg-gray-a3 hover:text-white data-[highlighted]:bg-gray-a3 data-[highlighted]:text-white"
              >
                <ImageIcon /> <span class="ml-2">Save PNG</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>S</Kbd>
                </KbdGroup>
              </div>

              <div
                {...rootApi().getItemProps({ value: "save-svg" })}
                class="relative flex cursor-default items-center rounded px-2 py-1.5 text-sm text-gray-11 transition-colors outline-none select-none hover:bg-gray-a3 hover:text-white data-[highlighted]:bg-gray-a3 data-[highlighted]:text-white"
              >
                <ImageIcon /> <span class="ml-2">Save SVG</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>⇧</Kbd>
                  <Kbd>S</Kbd>
                </KbdGroup>
              </div>

              <Show when={pngClipboardSupported()}>
                <div
                  {...rootApi().getItemProps({ value: "copy-png" })}
                  class="relative flex cursor-default items-center rounded px-2 py-1.5 text-sm text-gray-11 transition-colors outline-none select-none hover:bg-gray-a3 hover:text-white data-[highlighted]:bg-gray-a3 data-[highlighted]:text-white"
                >
                  <ClipboardIcon /> <span class="ml-2">Copy Image</span>
                  <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>C</Kbd>
                  </KbdGroup>
                </div>
              </Show>

              <div
                {...rootApi().getItemProps({ value: "copy-url" })}
                class="relative flex cursor-default items-center rounded px-2 py-1.5 text-sm text-gray-11 transition-colors outline-none select-none hover:bg-gray-a3 hover:text-white data-[highlighted]:bg-gray-a3 data-[highlighted]:text-white"
              >
                <LinkIcon /> <span class="ml-2">Copy URL</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>⇧</Kbd>
                  <Kbd>C</Kbd>
                </KbdGroup>
              </div>

              <div {...rootApi().getSeparatorProps()} class="-mx-1 my-1 h-px bg-gray-4" />

              {/* Submenu Trigger */}
              <div
                {...rootApi().getTriggerItemProps(subApi())}
                class="relative flex cursor-default items-center rounded px-2 py-1.5 text-sm text-gray-11 transition-colors outline-none select-none hover:bg-gray-a3 hover:text-white data-[highlighted]:bg-gray-a3 data-[highlighted]:text-white"
              >
                <ArrowsExpandingIcon /> <span class="ml-2">Size</span>
                <div class="ml-auto flex items-center gap-1">
                  <span class="text-gray-9">{SIZE_LABELS[exportSize()]}</span>
                  <ChevronRightIcon class="h-4 w-4 text-gray-9" />
                </div>
              </div>
            </div>
          </div>
        </Portal>

        {/* Submenu Content */}
        <Portal>
          <div {...subApi().getPositionerProps()} class="z-50">
            <div
              {...subApi().getContentProps()}
              class="animate-slideRightAndFade z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-4 bg-panel p-1 shadow-lg outline-none"
            >
              <For each={EXPORT_SIZE_OPTIONS}>
                {(size) => {
                  const isChecked = () => exportSize() === size;
                  return (
                    <div
                      {...subApi().getOptionItemProps({
                        type: "radio",
                        name: "exportSize",
                        value: String(size),
                        checked: isChecked(),
                      })}
                      class="relative flex cursor-default items-center rounded py-1.5 pr-2 pl-8 text-sm text-gray-11 transition-colors outline-none select-none hover:bg-gray-a3 hover:text-white data-[highlighted]:bg-gray-a3 data-[highlighted]:text-white"
                    >
                      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        <Show when={isChecked()}>
                          <CircleIcon class="h-2 w-2 fill-current text-brand" />
                        </Show>
                      </span>
                      {SIZE_LABELS[size]}
                    </div>
                  );
                }}
              </For>
            </div>
          </div>
        </Portal>
      </Show>
    </ButtonGroup>
  );
};

export default ExportButton;
