import { MultiplyIcon } from "@/components/icons";
import { cn } from "@/utils/cn";
import * as dialog from "@zag-js/dialog";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  createMemo,
  createUniqueId,
  Show,
  createContext,
  useContext,
  JSX,
  ParentProps,
} from "solid-js";
import { Portal } from "solid-js/web";

interface DialogContextType {
  api: () => dialog.Api;
}

const DialogContext = createContext<DialogContextType>();

export function Dialog(props: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: JSX.Element;
  id?: string;
}) {
  const service = useMachine(dialog.machine, () => ({
    id: props.id || createUniqueId(),
    open: props.open,
    onOpenChange(details) {
      props.onOpenChange?.(details.open);
    },
  }));

  const api = createMemo(() => dialog.connect(service, normalizeProps));

  return <DialogContext.Provider value={{ api }}>{props.children}</DialogContext.Provider>;
}

export function DialogTrigger(props: { children: JSX.Element; asChild?: boolean; class?: string }) {
  const ctx = useContext(DialogContext);
  if (!ctx) return <>{props.children}</>;

  return (
    <div {...ctx.api().getTriggerProps()} class={cn("inline-flex", props.class)}>
      {props.children}
    </div>
  );
}

export function DialogClose(props: { children?: JSX.Element; class?: string }) {
  const ctx = useContext(DialogContext);
  if (!ctx) return null;

  return (
    <button type="button" {...ctx.api().getCloseTriggerProps()} class={props.class}>
      {props.children}
    </button>
  );
}

export function DialogContent(props: {
  children: JSX.Element;
  size?: "small" | "medium" | "large";
  class?: string;
}) {
  const ctx = useContext(DialogContext);
  if (!ctx) return null;

  const size = () => props.size || "medium";

  return (
    <Show when={ctx.api().open}>
      <Portal>
        <div
          {...ctx.api().getBackdropProps()}
          class="data-[state=open]:animate-overlayShow fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/60"
        >
          <div
            {...ctx.api().getContentProps()}
            class={cn(
              "data-[state=open]:animate-contentShow relative my-10 grid w-full gap-4 rounded-md border border-gray-a3 bg-panel shadow-md duration-200 sm:rounded-lg",
              size() === "small" && "max-w-xs p-8",
              size() === "medium" && "max-w-lg p-6",
              size() === "large" && "max-w-3xl p-6",
              props.class,
            )}
          >
            {props.children}
            <button
              type="button"
              {...ctx.api().getCloseTriggerProps()}
              class="absolute top-4 right-4 rounded-full text-gray-11 opacity-70 ring-offset-panel transition-opacity hover:text-white hover:opacity-100 focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
              aria-label="Close"
            >
              <MultiplyIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
      </Portal>
    </Show>
  );
}

export function DialogTitle(props: { children: JSX.Element; class?: string }) {
  const ctx = useContext(DialogContext);
  if (!ctx)
    return (
      <h2 class={cn("text-base leading-none font-semibold tracking-tight", props.class)}>
        {props.children}
      </h2>
    );

  return (
    <h2
      {...ctx.api().getTitleProps()}
      class={cn("text-base leading-none font-semibold tracking-tight", props.class)}
    >
      {props.children}
    </h2>
  );
}

export function DialogHeader(props: ParentProps<{ class?: string }>) {
  return (
    <div class={cn("flex flex-col space-y-1.5 text-center sm:text-left", props.class)}>
      {props.children}
    </div>
  );
}

export function DialogFooter(props: ParentProps<{ class?: string }>) {
  return (
    <div class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", props.class)}>
      {props.children}
    </div>
  );
}
