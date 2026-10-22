import * as zagSwitch from "@zag-js/switch";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, JSX } from "solid-js";
import { cn } from "@/utils/cn";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  color?: "blue" | "purple";
  class?: string;
  className?: string;
  id?: string;
}

export function Switch(props: SwitchProps) {
  const service = useMachine(zagSwitch.machine, () => ({
    id: props.id || createUniqueId(),
    checked: props.checked,
    disabled: props.disabled,
    onCheckedChange(details) {
      props.onCheckedChange?.(details.checked);
    },
  }));

  const api = createMemo(() => zagSwitch.connect(service, normalizeProps));

  return (
    <label
      {...api().getRootProps()}
      class={cn(
        "inline-flex h-4 w-7 px-[3px] shrink-0 cursor-default items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-7 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-2 disabled:cursor-not-allowed disabled:opacity-50 duration-200",
        api().checked
          ? props.color === "purple"
            ? "bg-purple"
            : "bg-blue"
          : "bg-gray-7",
        props.class || props.className
      )}
    >
      <input {...api().getHiddenInputProps()} class="sr-only" />
      <span
        {...api().getThumbProps()}
        class={cn(
          "pointer-events-none block h-2.5 w-2.5 rounded-full bg-white ring-0 transition-transform duration-200",
          api().checked ? "translate-x-3" : "translate-x-0"
        )}
      />
    </label>
  );
}
