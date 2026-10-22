import { ParentComponent } from "solid-js";
import { RaycastLogoNegIcon } from "@/components/icons";
import { Button } from "./button";
import { cn } from "@/utils/cn";
import { CodeImageIcon } from "~/components/icons";

export function Navigation() {
  return (
    <nav class="fixed z-10 flex h-[50px] w-full items-center gap-3 pr-5 pl-4 text-white">
      <div class="flex items-center gap-3">
        <div class="hover:bg-gray-a4 hover:text-gray-12 focus-visible:ring-gray-a7 data-[state=open]:bg-gray-4 text-gray-12 inline-flex h-[30px] shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md px-3 py-1 pr-2 pl-1 text-sm font-medium whitespace-nowrap transition-colors duration-100 hover:cursor-default focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
          <CodeImageIcon class="h-6 w-6" />
          <span class="text-[15px] font-medium">Code Snippets</span>
        </div>
        <div class="relative z-10 -ml-2 flex items-center gap-[4px]">
          <span class="text-gray-9 text-sm">by </span>
          <div class="flex items-center gap-1 pl-[8px]">
            <RaycastLogoNegIcon class="h-6 w-6" />
            <span class="text-gray-12 hidden text-sm font-medium sm:block">Krea8</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export const NavigationActions: ParentComponent<{ class?: string; className?: string }> = (
  props,
) => {
  return (
    <div
      class={cn(
        "h-[50px] flex items-center justify-end fixed top-0 right-scrollbar-offset gap-2 z-10 left-[275px]",
        props.class || props.className,
      )}
    >
      {props.children}
    </div>
  );
};
