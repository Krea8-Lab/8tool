export const FONTS = [
  "fira-code",
  "google-sans",
  "inter",
] as const;

export type Font = (typeof FONTS)[number];
