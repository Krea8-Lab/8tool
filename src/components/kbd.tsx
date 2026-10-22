import { cn } from "@/utils/cn";
import { JSX, For } from "solid-js";

export function Kbd(props: { children: JSX.Element; size?: "small" | "medium" }) {
  const size = () => props.size || "small";
  return (
    <kbd
      class={cn(
        "inline-flex w-auto items-center justify-center bg-gray-a4 px-2 font-sans font-medium tracking-[0.1px] text-gray-a10",
        size() === "small" && "h-[18px] min-w-[18px] rounded-[3px] px-1 text-[10px]",
        size() === "medium" && "h-[28px] min-w-[28px] rounded-md px-2 text-xs",
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
      <div class="text-[13px] text-gray-11">{props.children}</div>
      <div class="flex items-end gap-1">
        <For each={props.keys}>{(key) => <Kbd size="medium">{key}</Kbd>}</For>
      </div>
    </div>
  );
}
