import { createSignal } from "solid-js";
import { isServer } from "solid-js/web";

export const EXPORT_SIZE_OPTIONS = [2, 4, 6] as const;

export const SIZE_LABELS = {
  2: "2x",
  4: "4x",
  6: "6x",
} as const;

export type ExportSize = (typeof EXPORT_SIZE_OPTIONS)[number];

export function isExportSize(value: ExportSize | unknown): value is ExportSize {
  return EXPORT_SIZE_OPTIONS.indexOf(value as ExportSize) !== -1;
}

function getInitialExportSize(): ExportSize {
  if (isServer) return EXPORT_SIZE_OPTIONS[1];
  try {
    const val = localStorage.getItem("size");
    const num = val ? parseInt(val, 10) : 4;
    return isExportSize(num) ? num : EXPORT_SIZE_OPTIONS[1];
  } catch {
    return EXPORT_SIZE_OPTIONS[1];
  }
}

export const [exportSize, setExportSizeInternal] = createSignal<ExportSize>(getInitialExportSize());

export function setExportSize(size: ExportSize) {
  setExportSizeInternal(size);
  if (!isServer) {
    try {
      localStorage.setItem("size", String(size));
    } catch {}
  }
}
