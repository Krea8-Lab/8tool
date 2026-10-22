import { JSX, splitProps } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const buttonVariants = cva(
  `inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-100 overflow-hidden
  focus-visible:outline-none focus-visible:ring-1 hover:cursor-default
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        primary:
          "bg-brand/15 text-brand hover:bg-brand/30 shadow-[inset_0_0_0_1px_#4d2a2a] hover:shadow-[inset_0_0_0_1px_#6d2d2d] focus-visible:ring-[#6d2d2d] focus-visible:shadow-[inset_0_0_0_1px_#6d2d2d]",
        secondary:
          "bg-gray-a3 text-gray-a11 hover:bg-gray-a4 hover:text-gray-12 shadow-[inset_0_0_0_1px_var(--gray-a2)] focus-visible:ring-gray-a7 focus-visible:shadow-[inset_0_0_0_1px_var(--gray-a7)]",
        transparent:
          "text-gray-a11 hover:bg-gray-a4 hover:text-gray-12 focus-visible:ring-gray-a7 focus-visible:ring-2",
      },
      size: {
        medium: "h-[30px] rounded-md px-3 text-sm gap-1.5",
        large: "h-9 px-4 py-2 gap-1.5",
      },
      iconOnly: {
        true: "p-0",
      },
    },
    compoundVariants: [
      {
        size: "medium",
        iconOnly: true,
        className: "w-[30px] h-[30px]",
      },
      {
        size: "large",
        iconOnly: true,
        className: "w-9 h-9",
      },
    ],
    defaultVariants: {
      variant: "secondary",
      size: "medium",
      iconOnly: false,
    },
  }
);

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    href?: string;
    target?: string;
    rel?: string;
  };

export function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, [
    "class",
    "variant",
    "size",
    "iconOnly",
    "children",
    "asChild",
    "href",
    "target",
    "rel",
  ]);

  const classes = () =>
    cn(
      buttonVariants({
        variant: local.variant,
        size: local.size,
        iconOnly: local.iconOnly,
      }),
      local.class,
    );

  if (local.href) {
    return (
      <a
        href={local.href}
        target={local.target}
        rel={local.rel}
        class={classes()}
        {...(others as JSX.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {local.children}
      </a>
    );
  }

  return (
    <button class={classes()} {...others}>
      {local.children}
    </button>
  );
}
