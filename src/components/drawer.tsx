import { Drawer as DrawerPrimitive } from "@ark-ui/solid/drawer";
import { type ComponentProps, type JSX, Show, splitProps } from "solid-js";
import { MultiplyIcon } from "~/components/icons";
import { cn } from "~/utils/cn";

export type DrawerRootProps = DrawerPrimitive.RootProps;

export function DrawerRoot(props: DrawerRootProps) {
  return (
    <>
      <DrawerPrimitive.Root {...props} />
    </>
  );
}

export type DrawerTriggerProps = DrawerPrimitive.TriggerProps;

export function DrawerTrigger(props: DrawerTriggerProps) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <DrawerPrimitive.Trigger
      class={cn(
        "inline-flex h-10 cursor-pointer items-center justify-center rounded-md border border-gray-a4 bg-panel px-4 text-sm font-medium text-gray-12 transition-colors hover:border-gray-a6 hover:bg-gray-a3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        local.class,
      )}
      {...others}
    >
      {local.children}
    </DrawerPrimitive.Trigger>
  );
}

export type DrawerBackdropProps = DrawerPrimitive.BackdropProps;

export function DrawerBackdrop(props: DrawerBackdropProps) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <DrawerPrimitive.Backdrop
      class={cn(
        "fixed inset-0 z-50 bg-black/60 data-[state=open]:[animation:fade-in_0.5s_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:[animation:fade-out_0.3s_cubic-bezier(0.4,0,0.2,1)]",
        local.class,
      )}
      {...others}
    />
  );
}

export type DrawerPositionerProps = DrawerPrimitive.PositionerProps;

export function DrawerPositioner(props: DrawerPositionerProps) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <DrawerPrimitive.Positioner
      class={cn(
        "fixed inset-0 z-50 flex items-end justify-center data-[swipe-direction=up]:items-start data-[swipe-direction=left]:items-stretch data-[swipe-direction=left]:justify-start data-[swipe-direction=right]:items-stretch data-[swipe-direction=right]:justify-end",
        local.class,
      )}
      {...others}
    />
  );
}

export type DrawerContentProps = DrawerPrimitive.ContentProps;

export function DrawerContent(props: DrawerContentProps) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <DrawerPrimitive.Content
      class={cn(
        "[--bleed:3rem] relative flex h-full max-h-[96svh] w-full flex-col rounded-t-[16px] border border-gray-a3 bg-panel px-5 shadow-2xl outline-none transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-[var(--bleed)] after:bg-inherit after:content-[''] data-[state=open]:[animation:slide-in-bottom_0.5s_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:[animation:slide-out-bottom_0.3s_cubic-bezier(0.4,0,0.2,1)] data-[swipe-direction=up]:rounded-t-none data-[swipe-direction=up]:rounded-b-[16px] data-[swipe-direction=up]:after:bottom-full data-[swipe-direction=up]:after:top-auto data-[swipe-direction=up]:data-[state=open]:[animation:slide-in-top_0.5s_cubic-bezier(0.32,0.72,0,1)] data-[swipe-direction=up]:data-[state=closed]:[animation:slide-out-top_0.3s_cubic-bezier(0.4,0,0.2,1)] data-[swipe-direction=left]:max-h-none data-[swipe-direction=left]:max-w-[400px] data-[swipe-direction=left]:rounded-l-none data-[swipe-direction=left]:rounded-r-[16px] data-[swipe-direction=left]:after:inset-x-auto data-[swipe-direction=left]:after:inset-y-0 data-[swipe-direction=left]:after:top-0 data-[swipe-direction=left]:after:right-full data-[swipe-direction=left]:after:h-auto data-[swipe-direction=left]:after:w-[var(--bleed)] data-[swipe-direction=left]:data-[state=open]:[animation:slide-in-left_0.5s_cubic-bezier(0.32,0.72,0,1)] data-[swipe-direction=left]:data-[state=closed]:[animation:slide-out-left_0.3s_cubic-bezier(0.4,0,0.2,1)] data-[swipe-direction=right]:max-h-none data-[swipe-direction=right]:max-w-[400px] data-[swipe-direction=right]:rounded-r-none data-[swipe-direction=right]:rounded-l-[16px] data-[swipe-direction=right]:after:inset-x-auto data-[swipe-direction=right]:after:inset-y-0 data-[swipe-direction=right]:after:top-0 data-[swipe-direction=right]:after:left-full data-[swipe-direction=right]:after:h-auto data-[swipe-direction=right]:after:w-[var(--bleed)] data-[swipe-direction=right]:data-[state=open]:[animation:slide-in-right_0.5s_cubic-bezier(0.32,0.72,0,1)] data-[swipe-direction=right]:data-[state=closed]:[animation:slide-out-right_0.3s_cubic-bezier(0.4,0,0.2,1)]",
        local.class,
      )}
      {...others}
    >
      {local.children}
    </DrawerPrimitive.Content>
  );
}

export type DrawerGrabberProps = DrawerPrimitive.GrabberProps;

export function DrawerGrabber(props: DrawerGrabberProps) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <DrawerPrimitive.Grabber
      class={cn(
        "group flex w-full shrink-0 cursor-grab items-center justify-center py-5 select-none touch-none active:cursor-grabbing",
        local.class,
      )}
      {...others}
    >
      {local.children || <DrawerGrabberIndicator />}
    </DrawerPrimitive.Grabber>
  );
}

export type DrawerGrabberIndicatorProps = DrawerPrimitive.GrabberIndicatorProps;

export function DrawerGrabberIndicator(props: DrawerGrabberIndicatorProps) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <DrawerPrimitive.GrabberIndicator
      class={cn(
        "h-1 w-10 rounded-full bg-gray-a5 transition-colors group-hover:bg-gray-a8",
        local.class,
      )}
      {...others}
    />
  );
}

export type DrawerTitleProps = DrawerPrimitive.TitleProps;

export function DrawerTitle(props: DrawerTitleProps) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <DrawerPrimitive.Title
      class={cn("m-0 mb-2 text-lg font-medium leading-7 text-gray-12", local.class)}
      {...others}
    >
      {local.children}
    </DrawerPrimitive.Title>
  );
}

export type DrawerDescriptionProps = DrawerPrimitive.DescriptionProps;

export function DrawerDescription(props: DrawerPrimitive.DescriptionProps) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <DrawerPrimitive.Description
      class={cn("mt-1 mb-0 text-sm leading-6 text-gray-11", local.class)}
      {...others}
    >
      {local.children}
    </DrawerPrimitive.Description>
  );
}

export type DrawerCloseTriggerProps = DrawerPrimitive.CloseTriggerProps;

export function DrawerCloseTrigger(props: DrawerCloseTriggerProps) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <DrawerPrimitive.CloseTrigger
      aria-label="Close"
      class={cn(
        "absolute top-12 right-4 flex h-7 w-7 cursor-pointer items-center justify-center rounded-[4px] border-none bg-transparent p-0 text-gray-a11 transition-colors hover:bg-gray-a3 hover:text-gray-12 focus-visible:-outline-offset-1 focus-visible:outline-2 focus-visible:outline-brand [&_svg]:h-4 [&_svg]:w-4",
        local.class,
      )}
      {...others}
    >
      {local.children || <MultiplyIcon class="h-4 w-4" />}
    </DrawerPrimitive.CloseTrigger>
  );
}

export type DrawerBodyProps = ComponentProps<"div">;

export function DrawerBody(props: DrawerBodyProps) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn("mx-auto flex w-full max-w-md min-h-0 flex-1 flex-col gap-4", local.class)}
      {...others}
    >
      {local.children}
    </div>
  );
}

export type DrawerScrollableProps = ComponentProps<"div">;

export function DrawerScrollable(props: DrawerScrollableProps) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-y-contain py-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-a4 [&::-webkit-scrollbar-thumb:hover]:bg-gray-a7",
        local.class,
      )}
      {...others}
    >
      {local.children}
    </div>
  );
}

export type DrawerScrollableItemProps = ComponentProps<"div">;

export function DrawerScrollableItem(props: DrawerScrollableItemProps) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn(
        "flex h-12 shrink-0 items-center justify-center rounded-lg border border-gray-a4 bg-gray-a2 px-4 text-sm font-medium text-gray-12 transition-colors hover:bg-gray-a4",
        local.class,
      )}
      {...others}
    >
      {local.children}
    </div>
  );
}

export interface DrawerProps extends DrawerPrimitive.RootProps {
  trigger?: JSX.Element;
  title?: JSX.Element;
  description?: JSX.Element;
  showGrabber?: boolean;
  showClose?: boolean;
  backdropClass?: string;
  positionerClass?: string;
  contentClass?: string;
  bodyClass?: string;
}

export function DrawerComponent(props: DrawerProps) {
  const [local, rootProps] = splitProps(props, [
    "trigger",
    "title",
    "description",
    "showGrabber",
    "showClose",
    "backdropClass",
    "positionerClass",
    "contentClass",
    "bodyClass",
    "children",
  ]);

  const hasConvenienceProps = () =>
    Boolean(
      local.trigger !== undefined || local.title !== undefined || local.description !== undefined,
    );

  return (
    <DrawerRoot {...rootProps}>
      <Show when={hasConvenienceProps()} fallback={local.children}>
        <Show when={local.trigger}>
          <DrawerTrigger>{local.trigger}</DrawerTrigger>
        </Show>
        <DrawerBackdrop class={local.backdropClass} />
        <DrawerPositioner class={local.positionerClass}>
          <DrawerContent class={local.contentClass}>
            <Show when={local.showGrabber !== false}>
              <DrawerGrabber>
                <DrawerGrabberIndicator />
              </DrawerGrabber>
            </Show>
            <Show when={local.title}>
              <DrawerTitle>{local.title}</DrawerTitle>
            </Show>
            <Show when={local.description}>
              <DrawerDescription>{local.description}</DrawerDescription>
            </Show>
            <DrawerBody class={local.bodyClass}>{local.children}</DrawerBody>
            <Show when={local.showClose !== false}>
              <DrawerCloseTrigger />
            </Show>
          </DrawerContent>
        </DrawerPositioner>
      </Show>
    </DrawerRoot>
  );
}

export const Drawer = Object.assign(DrawerComponent, {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Backdrop: DrawerBackdrop,
  Positioner: DrawerPositioner,
  Content: DrawerContent,
  Grabber: DrawerGrabber,
  GrabberIndicator: DrawerGrabberIndicator,
  Title: DrawerTitle,
  Description: DrawerDescription,
  CloseTrigger: DrawerCloseTrigger,
  Body: DrawerBody,
  Scrollable: DrawerScrollable,
  ScrollableItem: DrawerScrollableItem,
});

export default Drawer;
