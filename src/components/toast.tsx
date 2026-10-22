import * as zagToast from "@zag-js/toast";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, For, Show, JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { cn } from "@/utils/cn";
import { MultiplyIcon } from "./icons";

const toaster = zagToast.createStore({
  placement: "bottom-end",
  overlap: true,
  duration: 3000,
});

export const toast = {
  success(message: string | JSX.Element, options?: any) {
    return toaster.create({
      title: typeof message === "string" ? message : undefined,
      description: typeof message !== "string" ? () => message : undefined,
      type: "success",
      ...options,
    });
  },
  error(message: string | JSX.Element, options?: any) {
    return toaster.create({
      title: typeof message === "string" ? message : undefined,
      description: typeof message !== "string" ? () => message : undefined,
      type: "error",
      ...options,
    });
  },
  info(message: string | JSX.Element, options?: any) {
    return toaster.create({
      title: typeof message === "string" ? message : undefined,
      description: typeof message !== "string" ? () => message : undefined,
      type: "info",
      ...options,
    });
  },
  async promise<T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: any) => { message: string; description?: () => JSX.Element });
    }
  ) {
    const id = toaster.create({
      title: options.loading,
      type: "loading",
    });

    try {
      const result = await promise;
      const successMsg =
        typeof options.success === "function" ? options.success(result) : options.success;
      toaster.update(id, {
        title: successMsg,
        type: "success",
        duration: 2500,
      });
      return result;
    } catch (err: any) {
      let title = "An error occurred";
      let desc: (() => JSX.Element) | undefined;

      if (typeof options.error === "function") {
        const errObj = options.error(err);
        title = errObj.message;
        desc = errObj.description;
      } else if (typeof options.error === "string") {
        title = options.error;
      }

      toaster.update(id, {
        title,
        description: desc,
        type: "error",
        duration: 4000,
      });
      throw err;
    }
  },
};

function ToastItem(props: { toast: any; parent: any; index: number }) {
  const service = useMachine(zagToast.machine, () => ({
    ...props.toast,
    parent: props.parent,
    index: props.index,
  }));
  const api = createMemo(() => zagToast.connect(service, normalizeProps));

  return (
    <div
      {...api().getRootProps()}
      class={cn(
        "pointer-events-auto flex items-center justify-between gap-3 w-auto min-w-[240px] max-w-md rounded-lg p-3 shadow-lg border text-xs font-medium transition-all duration-200 animate-slideDownAndFade bg-background text-gray-12 border-gray-4",
        api().type === "error" && "border-red-900/50 text-red-200",
        api().type === "success" && "border-emerald-900/50 text-emerald-200"
      )}
    >
      <div class="flex flex-col gap-1">
        <Show when={api().title}>
          <span {...api().getTitleProps()} class="font-medium text-gray-12">
            {api().title as JSX.Element}
          </span>
        </Show>
        <Show when={api().description}>
          <div {...api().getDescriptionProps()} class="text-gray-11 text-[11px]">
            {typeof api().description === "function"
              ? (api().description as any)()
              : (api().description as JSX.Element)}
          </div>
        </Show>
      </div>
      <button
        {...api().getCloseTriggerProps()}
        class="text-gray-9 hover:text-white p-1 rounded transition-colors text-xs"
      >
        <MultiplyIcon class="h-4 w-4" />
      </button>
    </div>
  );
}

export function Toaster(props: { position?: string; offset?: number; duration?: number }) {
  const service = useMachine(zagToast.group.machine, () => ({
    id: createUniqueId(),
    store: toaster,
  }));

  const api = createMemo(() => zagToast.group.connect(service, normalizeProps));

  return (
    <Portal>
      <div
        {...api().getGroupProps()}
        class="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none"
      >
        <For each={api().getToasts()}>
          {(toast, index) => <ToastItem toast={toast} parent={service} index={index()} />}
        </For>
      </div>
    </Portal>
  );
}
