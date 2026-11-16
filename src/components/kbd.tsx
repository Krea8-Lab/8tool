import { JSX, For } from "solid-js";
import { cn } from "~/utils/cn";

export function Kbd(props: { children: JSX.Element; size?: "small" | "medium" }) {
  const size = () => props.size || "small";
  return (
    <kbd
      class={cn(
        "inline-flex w-auto items-center justify-center rounded border border-border/80 bg-secondary px-2 font-sans font-medium tracking-[0.1px] text-secondary-foreground shadow-2xs",
        size() === "small" && "h-[18px] min-w-[18px] rounded-[3px] px-1 text-[10px]",
        size() === "medium" && "h-[26px] min-w-[26px] rounded-md px-2 text-xs",
      )}
    >
      {props.children}
    </kbd>
  );
}

export function KbdGroup(props: { children: JSX.Element }) {
  return <div class="ml-auto inline-flex gap-1 pl-4">{props.children}</div>;
}

export function Shortcut(props: { children: JSX.Element; keys: string[] }) {
  return (
    <div class="flex items-center justify-between">
      <div class="text-[13px] text-muted-foreground">{props.children}</div>
      <div class="flex items-end gap-1">
        <For each={props.keys}>{(key) => <Kbd size="medium">{key}</Kbd>}</For>
      </div>
    </div>
  );
}
