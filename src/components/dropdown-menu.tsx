import { CircleIcon } from "@/components/icons";
import { cn } from "@/utils/cn";
import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, Show, createContext, useContext, JSX } from "solid-js";
import { Portal } from "solid-js/web";

interface MenuContextType {
  api: () => menu.Api;
}

const MenuContext = createContext<MenuContextType>();
const RadioGroupContext = createContext<{
  value?: string;
  onValueChange?: (val: string) => void;
}>();

export function DropdownMenu(props: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: JSX.Element;
  id?: string;
}) {
  const service = useMachine(menu.machine, () => ({
    id: props.id || createUniqueId(),
    open: props.open,
    onOpenChange(details) {
      props.onOpenChange?.(details.open);
    },
  }));

  const api = createMemo(() => menu.connect(service, normalizeProps));

  return (
    <MenuContext.Provider value={{ api }}>
      <div class="relative inline-flex items-center text-left">{props.children}</div>
    </MenuContext.Provider>
  );
}

export function DropdownMenuTrigger(props: {
  children: JSX.Element;
  asChild?: boolean;
  class?: string;
}) {
  const ctx = useContext(MenuContext);
  if (!ctx) return <>{props.children}</>;

  return (
    <div {...ctx.api().getTriggerProps()} class={cn("inline-flex", props.class)}>
      {props.children}
    </div>
  );
}

export function DropdownMenuContent(props: {
  children: JSX.Element;
  class?: string;
  sideOffset?: number;
  align?: "start" | "center" | "end";
}) {
  const ctx = useContext(MenuContext);
  if (!ctx) return null;

  return (
    <Show when={ctx.api().open}>
      <Portal>
        <div {...ctx.api().getPositionerProps()} class="z-50">
          <div
            {...ctx.api().getContentProps()}
            class={cn(
              "animate-slideDownAndFade z-50 min-w-[9.5rem] overflow-hidden rounded-md border border-gray-4 bg-panel p-1 shadow-md outline-none",
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

export function DropdownMenuItem(props: {
  children: JSX.Element;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  onSelect?: () => void;
  class?: string;
  className?: string;
  value?: string;
}) {
  const ctx = useContext(MenuContext);
  const id = props.value || createUniqueId();

  return (
    <div
      {...(ctx ? ctx.api().getItemProps({ value: id, disabled: props.disabled }) : {})}
      onClick={(e) => {
        if (!props.disabled) {
          props.onClick?.(e);
          props.onSelect?.();
        }
      }}
      class={cn(
        "relative flex cursor-default items-center rounded px-2 py-1.5 text-sm text-gray-11 transition-colors outline-none select-none hover:bg-gray-a3 hover:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        props.class || props.className,
      )}
    >
      {props.children}
    </div>
  );
}

export function DropdownMenuSeparator(props: { class?: string }) {
  const ctx = useContext(MenuContext);
  return (
    <div
      {...(ctx ? ctx.api().getSeparatorProps() : {})}
      class={cn("-mx-1 my-1 h-px bg-gray-4", props.class)}
    />
  );
}

export function DropdownMenuRadioGroup(props: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: JSX.Element;
}) {
  return (
    <RadioGroupContext.Provider value={{ value: props.value, onValueChange: props.onValueChange }}>
      <div role="group">{props.children}</div>
    </RadioGroupContext.Provider>
  );
}

export function DropdownMenuRadioItem(props: {
  value: string;
  children: JSX.Element;
  class?: string;
  onSelect?: () => void;
}) {
  const ctx = useContext(MenuContext);
  const group = useContext(RadioGroupContext);
  const isChecked = () => group?.value === props.value;

  return (
    <div
      {...(ctx ? ctx.api().getItemProps({ value: props.value }) : {})}
      onClick={() => {
        group?.onValueChange?.(props.value);
        props.onSelect?.();
      }}
      class={cn(
        "relative flex cursor-default items-center rounded py-1.5 pr-2 pl-8 text-sm text-gray-11 transition-colors outline-none select-none hover:bg-gray-a3 hover:text-white",
        props.class,
      )}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Show when={isChecked()}>
          <CircleIcon class="h-2 w-2 fill-current text-brand" />
        </Show>
      </span>
      {props.children}
    </div>
  );
}
