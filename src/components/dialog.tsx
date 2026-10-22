import * as dialog from "@zag-js/dialog";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  createMemo,
  createUniqueId,
  Show,
  createContext,
  useContext,
  JSX,
  ParentComponent,
  splitProps,
} from "solid-js";
import { Portal } from "solid-js/web";
import { MultiplyIcon } from "@/components/icons";
import { cn } from "@/utils/cn";

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

  return (
    <DialogContext.Provider value={{ api }}>
      {props.children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger(props: {
  children: JSX.Element;
  asChild?: boolean;
  class?: string;
}) {
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
          class="bg-black/60 fixed inset-0 z-50 data-[state=open]:animate-overlayShow overflow-y-auto grid place-items-center"
        >
            <div
              {...ctx.api().getContentProps()}
              class={cn(
                "grid w-full gap-4 rounded-md bg-panel border border-gray-a3 shadow-md duration-200 data-[state=open]:animate-contentShow sm:rounded-lg my-10 relative",
                size() === "small" && "max-w-xs p-8",
                size() === "medium" && "max-w-lg p-6",
                size() === "large" && "max-w-3xl p-6",
                props.class
              )}
            >
              {props.children}
              <button
                type="button"
                {...ctx.api().getCloseTriggerProps()}
                class="absolute right-4 top-4 rounded-full opacity-70 ring-offset-panel transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 disabled:pointer-events-none text-gray-11 hover:text-white"
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
  if (!ctx) return <h2 class={cn("text-base font-semibold leading-none tracking-tight", props.class)}>{props.children}</h2>;

  return (
    <h2
      {...ctx.api().getTitleProps()}
      class={cn("text-base font-semibold leading-none tracking-tight", props.class)}
    >
      {props.children}
    </h2>
  );
}

export function DialogHeader(props: ParentComponent<{ class?: string }>) {
  return (
    <div class={cn("flex flex-col space-y-1.5 text-center sm:text-left", props.class)}>
      {props.children}
    </div>
  );
}

export function DialogFooter(props: ParentComponent<{ class?: string }>) {
  return (
    <div class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", props.class)}>
      {props.children}
    </div>
  );
}
