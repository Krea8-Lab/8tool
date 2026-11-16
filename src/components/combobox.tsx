import * as combobox from "@zag-js/combobox";
import { normalizeProps, useMachine, type PropTypes } from "@zag-js/solid";
import { cva } from "class-variance-authority";
import {
  createMemo,
  createSignal,
  createUniqueId,
  Show,
  For,
  createContext,
  useContext,
  JSX,
} from "solid-js";
import { Portal } from "solid-js/web";
import { ChevronDownIcon, MagnifyingGlassIcon } from "~/components/icons";
import { cn } from "~/utils/cn";

interface ComboboxContextType<T = any> {
  api: () => combobox.Api<PropTypes, T>;
  items: () => T[];
  query: () => string;
  setQuery: (q: string) => void;
  filteredItems: () => T[];
  selectedValue: () => T | null;
  onSelect: (item: T) => void;
  itemToString: (item: T | null) => string;
}

const ComboboxContext = createContext<ComboboxContextType>();

export interface ComboboxProps<T = any> {
  items: T[];
  value?: T | null;
  onValueChange?: (value: T) => void;
  itemToStringLabel?: (item: T | null) => string;
  itemToValue?: (item: T) => string;
  autoHighlight?: boolean;
  children: JSX.Element;
  id?: string;
}

export function Combobox<T = any>(props: ComboboxProps<T>) {
  const [query, setQuery] = createSignal("");
  const itemToString = props.itemToStringLabel || ((item: any) => item?.name || String(item || ""));
  const itemToValue = props.itemToValue || ((item: any) => item?.id || String(item || ""));

  const collection = createMemo(() =>
    combobox.collection({
      items: props.items,
      itemToString: (item) => itemToString(item),
      itemToValue: (item) => itemToValue(item),
    }),
  );

  const service = useMachine(combobox.machine, () => ({
    id: props.id || createUniqueId(),
    collection: collection(),
    autoHighlight: props.autoHighlight ?? true,
    inputValue: query(),
    onInputValueChange(details) {
      setQuery(details.inputValue);
    },
    onValueChange(details) {
      if (details.items && details.items[0]) {
        props.onValueChange?.(details.items[0]);
      }
    },
  }));

  const api = createMemo(() => combobox.connect(service, normalizeProps));

  const filteredItems = createMemo(() => {
    const q = query().toLowerCase().trim();
    if (!q) return props.items;
    return props.items.filter((item: any) => {
      const label = itemToString(item).toLowerCase();
      return label.includes(q);
    });
  });

  const onSelect = (item: T) => {
    props.onValueChange?.(item);
    api().setOpen(false);
  };

  return (
    <ComboboxContext.Provider
      value={{
        api,
        items: () => props.items,
        query,
        setQuery,
        filteredItems,
        selectedValue: () => props.value ?? null,
        onSelect,
        itemToString,
      }}
    >
      <div {...api().getRootProps()} class="relative inline-block w-full">
        {props.children}
      </div>
    </ComboboxContext.Provider>
  );
}

const triggerVariants = cva(
  `flex w-full cursor-pointer border items-center gap-1.5 overflow-hidden rounded-md text-xs font-normal whitespace-nowrap transition-all duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        classic:
          "bg-secondary text-secondary-foreground border-border shadow-xs hover:bg-secondary/80 hover:border-ring/40 focus-visible:border-ring active:scale-[0.98]",
        soft: "bg-muted text-foreground border-border shadow-xs hover:bg-muted/80 hover:border-ring/40 focus-visible:border-ring active:scale-[0.98]",
      },
      size: {
        small: "h-[24px] rounded px-2 text-xs",
        medium: "h-[26px] rounded-md px-2 text-xs",
        large: "h-9 px-3 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "classic",
      size: "medium",
    },
  },
);

export function ComboboxTrigger(props: {
  children: JSX.Element;
  variant?: "classic" | "soft";
  size?: "small" | "medium" | "large";
  class?: string;
  className?: string;
  icon?: (props: any) => JSX.Element;
  ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void);
}) {
  const ctx = useContext(ComboboxContext);
  if (!ctx) return null;

  const IconComponent = () => props.icon || ChevronDownIcon;

  return (
    <button
      ref={props.ref}
      type="button"
      {...ctx.api().getTriggerProps()}
      class={cn(
        triggerVariants({
          variant: props.variant,
          size: props.size,
          className: props.class || props.className,
        }),
      )}
    >
      <span class="truncate">{props.children}</span>
      <span class="ml-auto flex items-center">
        {IconComponent()({ class: "h-3.5 w-3.5 opacity-50" })}
      </span>
    </button>
  );
}

export function ComboboxValue<T = any>(props: { children: (value: T | null) => JSX.Element }) {
  const ctx = useContext(ComboboxContext);
  if (!ctx) return null;

  return <>{props.children(ctx.selectedValue())}</>;
}

export function ComboboxContent(props: {
  children: JSX.Element;
  searchPlaceholder?: string;
  showSearchIcon?: boolean;
  class?: string;
  listClass?: string;
}) {
  const ctx = useContext(ComboboxContext);
  if (!ctx) return null;

  return (
    <Show when={ctx.api().open}>
      <Portal>
        <div {...ctx.api().getPositionerProps()} class="z-50">
          <div
            {...ctx.api().getContentProps()}
            class={cn(
              "animate-slideDownAndFade z-50 flex max-h-80 min-w-[12rem] flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground p-1 shadow-xl outline-none backdrop-blur-md",
              props.class,
            )}
          >
            <div class="flex items-center gap-2 border-b border-border px-2 py-1.5">
              <Show when={props.showSearchIcon ?? true}>
                <MagnifyingGlassIcon class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              </Show>
              <input
                {...ctx.api().getInputProps()}
                placeholder={props.searchPlaceholder || "Search..."}
                class="w-full border-none bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
                value={ctx.query()}
                onInput={(e) => ctx.setQuery(e.currentTarget.value)}
                autofocus
              />
            </div>
            <div
              class={cn(
                "flex max-h-60 scrollbar-thin flex-col gap-0.5 overflow-y-auto bg-transparent p-1",
                props.listClass,
              )}
            >
              {props.children}
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
}

export function ComboboxEmpty(props: { children: JSX.Element }) {
  const ctx = useContext(ComboboxContext);
  if (!ctx) return null;

  return (
    <Show when={ctx.filteredItems().length === 0}>
      <div class="py-4 text-center text-xs text-muted-foreground">{props.children}</div>
    </Show>
  );
}

export function ComboboxList<T = any>(props: {
  children: (item: T, index: () => number) => JSX.Element;
}) {
  const ctx = useContext(ComboboxContext);
  if (!ctx) return null;

  return <For each={ctx.filteredItems()}>{(item, idx) => props.children(item, idx)}</For>;
}

export function ComboboxItem<T = any>(props: { value: T; children: JSX.Element; class?: string }) {
  const ctx = useContext(ComboboxContext);
  if (!ctx) return null;

  const isSelected = () => {
    const sel = ctx.selectedValue();
    if (!sel) return false;
    if (typeof sel === "object" && typeof props.value === "object") {
      return (sel as any).id === (props.value as any).id;
    }
    return sel === props.value;
  };

  return (
    <div
      onClick={() => ctx.onSelect(props.value)}
      class={cn(
        "relative flex cursor-pointer items-center rounded px-2 py-1.5 text-xs text-popover-foreground transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        isSelected() && "bg-accent/80 font-medium text-accent-foreground",
        props.class,
      )}
    >
      {props.children}
    </div>
  );
}

export function ComboboxGroup(props: {
  items?: any[];
  children: JSX.Element | ((item: any) => JSX.Element);
}) {
  return (
    <div role="group" class="mb-1 flex flex-col gap-0.5">
      {typeof props.children === "function" && props.items ? (
        <For each={props.items}>{(item) => (props.children as any)(item)}</For>
      ) : (
        (props.children as JSX.Element)
      )}
    </div>
  );
}

export function ComboboxGroupLabel(props: { children: JSX.Element }) {
  return (
    <div class="px-2 py-1 text-[10px] font-semibold tracking-wider text-foreground uppercase">
      {props.children}
    </div>
  );
}

export function ComboboxSeparator() {
  return <div class="-mx-1 my-1 h-px bg-muted" />;
}
