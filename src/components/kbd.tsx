import { JSX, For } from "solid-js";
import { cn } from "@/utils/cn";

export function Kbd(props: { children: JSX.Element; size?: "small" | "medium" }) {
  const size = () => props.size || "small";
  return (
    <kbd
      class={cn(
        "inline-flex items-center justify-center px-2 font-medium bg-gray-a4 tracking-[0.1px] font-sans w-auto text-gray-a10",
        size() === "small" && "h-[18px] px-1 text-[10px] rounded-[3px] min-w-[18px]",
        size() === "medium" && "h-[28px] px-2 text-xs rounded-md min-w-[28px]"
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
    <div class="flex justify-between items-center">
      <div class="text-gray-11 text-[13px]">{props.children}</div>
      <div class="flex items-end gap-1">
        <For each={props.keys}>
          {(key) => <Kbd size="medium">{key}</Kbd>}
        </For>
      </div>
    </div>
  );
}
