import { ParentComponent } from "solid-js";
import { cn } from "~/utils/cn";

import { Krea8LogoIcon, CodeImageIcon } from "./icons";

export function Navigation() {
  return (
    <nav class="fixed z-10 flex h-[50px] w-full items-center gap-3 pr-5 pl-4 text-foreground">
      <div class="flex items-center gap-3">
        <div class="group inline-flex h-[30px] shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md px-3 py-1 pr-2 pl-1 text-sm font-medium whitespace-nowrap transition-colors duration-100 hover:cursor-default hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-background/30">
          <CodeImageIcon class="h-6 w-6" />
          <span class="group-ease-in group-ease-out hidden text-[15px] font-medium sm:block">
            Code Snippets
          </span>
          <span class="group-ease-in group-ease-out sm:hidden block">CS</span>
        </div>
        <div class="relative z-10 -ml-2 flex items-center gap-[4px]">
          <span class="text-sm">by </span>
          <div class="flex items-center gap-1 pl-[8px]">
            <Krea8LogoIcon class="h-6 w-6" />
            <span class="hidden text-sm font-medium sm:block">Krea8</span>
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
        "right-scrollbar-offset fixed top-0 left-[275px] z-10 flex h-[50px] items-center justify-end gap-2",
        props.class || props.className,
      )}
    >
      {props.children}
    </div>
  );
};
