import {
  paddingOption,
  showBackgroundAtom,
} from "@/store";
import { themeDarkModeAtom } from "@/store/themes";
import { exportSize } from "@/store/image";
import { cn } from "@/utils/cn";
import { createSignal, createEffect, onMount, onCleanup, JSX } from "solid-js";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./FirecrawlFrame.module.css";

const FIRECRAWL_ASCII_ART = `                                   .. ..-
                                   :          .
                              ..        .   ..-
                            .        .._  ..-...:.              ..       .
                  .      .  .-.    ...     .-.-.._.-   ..        .-..     .      .
               ...._. . .-.....-:....      ..-::.::._=:.  ....       ...  .-      ....
             .....-._.._.:.....-.+:....-..    .....-:+++++++=:..-.---..    ...:.-..      ....
           .._.-._.-.:_.:-.  ...+..+:._-....:-._:+++++===+:_:+:....      -..+++++.:..  .-._-..      .
        .........--::+:._-:-.._..-.+:.-_::++_.:+:+========+=+:+:--..  .   _-_.:+===+-. ._..+:.-........  .
       ....-..---_-++====+:_:=:..+:.:+=+-..._++++======X==========++::.:+-..  .:+====X==+=++++++-.-......
     .......-:+:_:+:++=XX=X======++++++=X===::+++:++==XXXXXX===+==++===+=+=========XXX===++++=+:_---...-..-.
    ....._.:++======+===XXXXXXXX=+=++============XXXXXXXXXX============X======XXXXXXX======X==++:._---_`;

const FIRECRAWL_STAR_PATH =
  "M10.5 4C10.5 7.31371 7.81371 10 4.5 10H0.5V11H4.5C7.81371 11 10.5 13.6863 10.5 17V21H11.5V17C11.5 13.6863 14.1863 11 17.5 11H21.5V10H17.5C14.1863 10 11.5 7.31371 11.5 4V0H10.5V4Z";

function FirecrawlFrameCanvas(props: {
  gridColor: string;
  padding: number;
  exportPixelRatio?: number;
}) {
  let overlayRef: HTMLDivElement | undefined;
  let canvasRef: HTMLCanvasElement | undefined;
  const [size, setSize] = createSignal({ width: 0, height: 0 });

  const draw = (ctx: CanvasRenderingContext2D, w: number, h: number, color: string) => {
    const i = props.padding;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(w, i);
    ctx.moveTo(0, h - i);
    ctx.lineTo(w, h - i);
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.moveTo(w - i, 0);
    ctx.lineTo(w - i, h);
    ctx.stroke();
    const starPath = new Path2D(FIRECRAWL_STAR_PATH);
    ctx.fillStyle = color;
    const drawStar = (x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.translate(-11, -10.5);
      ctx.fill(starPath);
      ctx.restore();
    };
    drawStar(i, i);
    drawStar(w - i, i);
    drawStar(i, h - i);
    drawStar(w - i, h - i);
  };

  onMount(() => {
    if (!overlayRef) return;
    const measure = () => {
      if (!overlayRef) return;
      const rect = overlayRef.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w > 0 && h > 0) setSize({ width: w, height: h });
    };
    const ro = new ResizeObserver(() => measure());
    ro.observe(overlayRef);
    measure();
    const fallback = setTimeout(measure, 100);
    onCleanup(() => {
      clearTimeout(fallback);
      ro.disconnect();
    });
  });

  createEffect(() => {
    const canvas = canvasRef;
    const s = size();
    if (!canvas || s.width === 0 || s.height === 0) return;
    const displayDpr = Math.min(
      2,
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
    );
    const dpr = Math.max(displayDpr, props.exportPixelRatio || 2);
    canvas.width = s.width * dpr;
    canvas.height = s.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    draw(ctx, s.width, s.height, props.gridColor);
  });

  return (
    <div ref={overlayRef} class={styles.frameOverlay} data-grid>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
        aria-hidden
      />
    </div>
  );
}

export const FirecrawlFrame = () => {
  const gridColor = () => (themeDarkModeAtom() ? "#444" : "#ededed");

  return (
    <div
      class={cn(
        sharedStyles.frame,
        showBackgroundAtom() && styles.frame,
        showBackgroundAtom() && !themeDarkModeAtom() && styles.frameLightMode,
        !showBackgroundAtom() && sharedStyles.noBackground,
        !showBackgroundAtom() && styles.noBackground,
      )}
      style={{
        padding: `${paddingOption()}px`,
        "--frame-padding": `${paddingOption()}px`,
      }}
    >
      {!showBackgroundAtom() && (
        <div data-ignore-in-export class={sharedStyles.transparentPattern}></div>
      )}
      <div class={styles.window}>
        {showBackgroundAtom() && (
          <div class={styles.asciiArtContainer}>
            <pre class={styles.asciiArt}>{FIRECRAWL_ASCII_ART}</pre>
          </div>
        )}
        <Editor />
        {showBackgroundAtom() && (
          <FirecrawlFrameCanvas
            gridColor={gridColor()}
            padding={paddingOption()}
            exportPixelRatio={exportSize()}
          />
        )}
      </div>
    </div>
  );
};

export default FirecrawlFrame;
