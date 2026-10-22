import * as tooltip from "@zag-js/tooltip";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, Show, JSX, ParentComponent, createContext, useContext } from "solid-js";
import { Portal } from "solid-js/web";
import { cn } from "@/utils/cn";

interface TooltipContextType {
  api: () => tooltip.Api;
}

const TooltipContext = createContext<TooltipContextType>();

export const TooltipProvider: ParentComponent = (props) => {
  return <>{props.children}</>;
};

export function Tooltip(props: {
  children: JSX.Element;
  content?: JSX.Element;
  openDelay?: number;
  closeDelay?: number;
}) {
  const service = useMachine(tooltip.machine, {
    id: createUniqueId(),
    openDelay: props.openDelay ?? 200,
    closeDelay: props.closeDelay ?? 150,
  });

  const api = createMemo(() => tooltip.connect(service, normalizeProps));

  return (
    <TooltipContext.Provider value={{ api }}>
      {props.content ? (
        <div class="inline-flex">
          <div {...api().getTriggerProps()}>{props.children}</div>
          <Show when={api().open}>
            <Portal>
              <div {...api().getPositionerProps()} class="z-50">
                <div
                  {...api().getContentProps()}
                  class="px-3 py-2 bg-gray-4 text-gray-12 rounded-lg text-sm leading-none select-none shadow-md animate-slideDownAndFade border border-gray-a3"
                >
                  {props.content}
                </div>
              </div>
            </Portal>
          </Show>
        </div>
      ) : (
        props.children
      )}
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger(props: { children: JSX.Element; asChild?: boolean; class?: string }) {
  const ctx = useContext(TooltipContext);
  if (!ctx) return <>{props.children}</>;

  return (
    <div {...ctx.api().getTriggerProps()} class={cn("inline-flex", props.class)}>
      {props.children}
    </div>
  );
}

export function TooltipContent(props: { children: JSX.Element; class?: string; sideOffset?: number }) {
  const ctx = useContext(TooltipContext);
  if (!ctx) return null;

  return (
    <Show when={ctx.api().open}>
      <Portal>
        <div {...ctx.api().getPositionerProps()} class="z-50">
          <div
            {...ctx.api().getContentProps()}
            class={cn(
              "px-3 py-2 bg-gray-4 text-gray-12 rounded-lg text-sm leading-none select-none shadow-md animate-slideDownAndFade border border-gray-a3",
              props.class
            )}
          >
            {props.children}
          </div>
        </div>
      </Portal>
    </Show>
  );
}
