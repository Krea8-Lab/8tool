import { cva, type VariantProps } from "class-variance-authority";
import { JSX, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

export const buttonVariants = cva(
  `inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md text-sm font-medium whitespace-nowrap transition-all duration-150 hover:cursor-default active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow focus-visible:ring-2 focus-visible:ring-ring",
        secondary:
          "bg-secondary text-secondary-foreground border border-border shadow-xs hover:bg-secondary/80 hover:border-ring/40 focus-visible:ring-2 focus-visible:ring-ring",
        transparent:
          "text-foreground/80 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
      },
      size: {
        medium: "h-[30px] gap-1.5 rounded-md px-3 text-sm",
        large: "h-9 gap-1.5 px-4 py-2",
      },
      iconOnly: {
        true: "p-0",
      },
    },
    compoundVariants: [
      {
        size: "medium",
        iconOnly: true,
        className: "h-[30px] w-[30px]",
      },
      {
        size: "large",
        iconOnly: true,
        className: "h-9 w-9",
      },
    ],
    defaultVariants: {
      variant: "secondary",
      size: "medium",
      iconOnly: false,
    },
  },
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
