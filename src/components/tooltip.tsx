import { cn } from "@/utils/cn";
import { normalizeProps, useMachine } from "@zag-js/solid";
import * as tooltip from "@zag-js/tooltip";
import {
  createMemo,
  createUniqueId,
  Show,
  JSX,
  ParentComponent,
  createContext,
  useContext,
} from "solid-js";
import { Portal } from "solid-js/web";

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
                  class="animate-slideDownAndFade rounded-lg border border-gray-a3 bg-gray-4 px-3 py-2 text-sm leading-none text-gray-12 shadow-md select-none"
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

export function TooltipTrigger(props: {
  children: JSX.Element;
  asChild?: boolean;
  class?: string;
}) {
  const ctx = useContext(TooltipContext);
  if (!ctx) return <>{props.children}</>;

  return (
    <div {...ctx.api().getTriggerProps()} class={cn("inline-flex", props.class)}>
      {props.children}
    </div>
  );
}

export function TooltipContent(props: {
  children: JSX.Element;
  class?: string;
  sideOffset?: number;
}) {
  const ctx = useContext(TooltipContext);
  if (!ctx) return null;

  return (
    <Show when={ctx.api().open}>
      <Portal>
        <div {...ctx.api().getPositionerProps()} class="z-50">
          <div
            {...ctx.api().getContentProps()}
            class={cn(
              "animate-slideDownAndFade rounded-lg border border-gray-a3 bg-gray-4 px-3 py-2 text-sm leading-none text-gray-12 shadow-md select-none",
              props.class,
            )}
          >
            {props.children}
          </div>
        </div>
      </Portal>
    </Show>
  );
}
