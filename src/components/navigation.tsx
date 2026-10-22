import { RaycastLogoNegIcon } from "@/components/icons";
import { cn } from "@/utils/cn";
import { ParentComponent } from "solid-js";
import { CodeImageIcon } from "~/components/icons";

export function Navigation() {
  return (
    <nav class="fixed z-10 flex h-[50px] w-full items-center gap-3 pr-5 pl-4 text-white">
      <div class="flex items-center gap-3">
        <div class="inline-flex h-[30px] shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md px-3 py-1 pr-2 pl-1 text-sm font-medium whitespace-nowrap text-gray-12 transition-colors duration-100 hover:cursor-default hover:bg-gray-a4 hover:text-gray-12 focus-visible:ring-2 focus-visible:ring-gray-a7 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-gray-4">
          <CodeImageIcon class="h-6 w-6" />
          <span class="text-[15px] font-medium">Code Snippets</span>
        </div>
        <div class="relative z-10 -ml-2 flex items-center gap-[4px]">
          <span class="text-sm text-gray-9">by </span>
          <div class="flex items-center gap-1 pl-[8px]">
            <RaycastLogoNegIcon class="h-6 w-6" />
            <span class="hidden text-sm font-medium text-gray-12 sm:block">Krea8</span>
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
