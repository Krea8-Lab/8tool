import XMarkIcon from "@/assets/icons/x-mark-circle-filled-16.svg";
import { windowWidth, setWindowWidth } from "@/store";
import { cn } from "@/utils/cn";
import { createSignal, ParentComponent, Show } from "solid-js";

import styles from "./ResizableFrame.module.css";

type Handle = "right" | "left";

const maxWidth = 920;
const minWidth = 520;

export const ResizableFrame: ParentComponent = (props) => {
  let currentHandle: Handle | undefined;
  let windowRef: HTMLDivElement | undefined;
  let startWidth: number | undefined;
  let startX: number | undefined;
  const [isResizing, setResizing] = createSignal(false);

  const mouseMoveHandler = (event: MouseEvent) => {
    let newWidth: number;

    if (currentHandle === "left") {
      newWidth = startWidth! - (event.clientX - startX!) * 2;
    } else {
      newWidth = startWidth! + (event.clientX - startX!) * 2;
    }

    if (newWidth > maxWidth) {
      newWidth = maxWidth;
    } else if (newWidth < minWidth) {
      newWidth = minWidth;
    }

    setWindowWidth(newWidth);
  };

  const clearSelection = () => {
    const sel = document.getSelection();
    if (sel) {
      if (sel.removeAllRanges) {
        sel.removeAllRanges();
      } else if (sel.empty) {
        sel.empty();
      }
    }
  };

  const mouseUpHandler = () => {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
    setResizing(false);
    clearSelection();
  };

  const handleResizeFrameX = (handle: Handle) => (event: MouseEvent) => {
    currentHandle = handle;
    startWidth = windowRef?.offsetWidth || 0;
    startX = event.clientX;
    setResizing(true);

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  return (
    <div class={cn(styles.resizableFrame, isResizing() && styles.isResizing)}>
      <div
        class={cn(styles.windowSizeDragPoint, styles.left)}
        onMouseDown={handleResizeFrameX("left")}
      />
      <div
        class={cn(styles.windowSizeDragPoint, styles.right)}
        onMouseDown={handleResizeFrameX("right")}
      />
      <div ref={windowRef} style={{ width: windowWidth() ? `${windowWidth()}px` : "auto" }}>
        {props.children}
      </div>

      <Show when={windowWidth() && !isResizing()}>
        <div class={styles.resetWidthContainer}>
          <a
            class={styles.resetWidth}
            onClick={(event) => {
              event.preventDefault();
              setWindowWidth(null);
            }}
          >
            <XMarkIcon />
            <span>Set to auto width</span>
          </a>
        </div>
      </Show>

      <Show when={isResizing()}>
        <div class={styles.ruler}>
          <span>{windowWidth()} px</span>
        </div>
      </Show>
    </div>
  );
};

export default ResizableFrame;
