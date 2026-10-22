import { createSignal } from "solid-js";

export const [showLineNumbers, setShowLineNumbers] = createSignal<boolean | undefined>(undefined);
export { showLineNumbers as showLineNumbersAtom };
