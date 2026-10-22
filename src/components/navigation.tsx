import { ParentComponent } from "solid-js";
import { RaycastLogoNegIcon } from "@/components/icons";
import { Button } from "./button";
import { cn } from "@/utils/cn";
import { CodeImageIcon } from "~/components/icons";

export function Navigation() {
  return (
    <nav class="flex items-center gap-3 h-[50px] pl-4 pr-5 text-white w-full fixed z-10">
      <div class="flex items-center gap-3">
        <div class="inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium transition-colors duration-100 overflow-hidden focus-visible:outline-none hover:cursor-default disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-a4 hover:text-gray-12 focus-visible:ring-gray-a7 focus-visible:ring-2 h-[30px] rounded-md px-3 text-sm py-1 pl-1 pr-2 gap-2 data-[state=open]:bg-gray-4 text-gray-12">
          <CodeImageIcon class="w-6 h-6" />
          <span class="text-[15px] font-medium">Code Snippets</span>
        </div>
        <div class="-ml-2 flex items-center relative z-10 gap-[4px]">
          <span class="text-sm text-gray-9">by </span>
          <div class="flex gap-1 pl-[8px] items-center">
            <RaycastLogoNegIcon class="w-6 h-6" />
            <span class="text-sm text-gray-12 font-medium hidden sm:block">Krea8</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export const NavigationActions: ParentComponent<{ class?: string; className?: string }> = (props) => {
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
