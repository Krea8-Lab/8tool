import { toPng as htmlToPng, toSvg as htmlToSvg, toBlob as htmlToBlob } from "html-to-image";

const imageFilter = (node: HTMLElement) => {
  if (node.tagName === "TEXTAREA") return false;
  if ("ignoreInExport" in (node.dataset || {})) return false;
  if (node.hasAttribute && node.hasAttribute("data-ignore-in-export")) return false;
  return true;
};

const htmlToImageOptions = {
  filter: imageFilter,
  skipAutoScale: true,
};

type PngOptions = Parameters<typeof htmlToPng>[1];
export const toPng = async (node: HTMLElement, options?: PngOptions) => {
  if (typeof document !== "undefined" && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {}
  }
  return htmlToPng(node, {
    ...htmlToImageOptions,
    ...options,
  });
};

type BlobOptions = Parameters<typeof htmlToBlob>[1];
export const toBlob = async (node: HTMLElement, options?: BlobOptions) => {
  if (typeof document !== "undefined" && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {}
  }
  return htmlToBlob(node, {
    ...htmlToImageOptions,
    ...options,
  });
};

type SvgOptions = Parameters<typeof htmlToSvg>[1];
export const toSvg = async (node: HTMLElement, options?: SvgOptions) => {
  if (typeof document !== "undefined" && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {}
  }
  return htmlToSvg(node, {
    ...htmlToImageOptions,
    ...options,
  });
};
