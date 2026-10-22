import { setFrameRef } from "@/store";
import { THEMES, themeAtom, themeDarkModeAtom } from "@/store/themes";

import FlashMessage from "./FlashMessage";
import Auth0Frame from "./frames/Auth0Frame";
import AwsFrame from "./frames/AwsFrame";
import BrowserbaseFrame from "./frames/BrowserbaseFrame";
import ClerkFrame from "./frames/ClerkFrame";
import CloudflareFrame from "./frames/CloudflareFrame";
import DefaultFrame from "./frames/DefaultFrame";
import ElevenLabsFrame from "./frames/ElevenLabsFrame";
import FirecrawlFrame from "./frames/FirecrawlFrame";
import GeminiFrame from "./frames/GeminiFrame";
import MintlifyFrame from "./frames/MintlifyFrame";
import NuxtFrame from "./frames/NuxtFrame";
import OpenAIFrame from "./frames/OpenAIFrame";
import PrismaFrame from "./frames/PrismaFrame";
import ResendFrame from "./frames/ResendFrame";
import StripeFrame from "./frames/StripeFrame";
import SupabaseFrame from "./frames/SupabaseFrame";
import TailwindFrame from "./frames/TailwindFrame";
import TriggerdevFrame from "./frames/TriggerdevFrame";
import VercelFrame from "./frames/VercelFrame";
import ResizableFrame from "./ResizableFrame";

import styles from "./Frame.module.css";
import "./gemini-styles.css";

export const Frame = (props: { resize?: boolean }) => {
  const resize = () => props.resize ?? true;

  function renderFrame() {
    const id = themeAtom().id;
    switch (id) {
      case THEMES.aws.id:
        return <AwsFrame />;
      case THEMES.vercel.id:
      case THEMES.rabbit.id:
        return <VercelFrame />;
      case THEMES.supabase.id:
        return <SupabaseFrame />;
      case THEMES.tailwind.id:
        return <TailwindFrame />;
      case THEMES.clerk.id:
        return <ClerkFrame />;
      case THEMES.mintlify.id:
        return <MintlifyFrame />;
      case THEMES.openai.id:
        return <OpenAIFrame />;
      case THEMES.triggerdev.id:
        return <TriggerdevFrame />;
      case THEMES.prisma.id:
        return <PrismaFrame />;
      case THEMES.elevenlabs.id:
        return <ElevenLabsFrame />;
      case THEMES.resend.id:
        return <ResendFrame />;
      case THEMES.browserbase.id:
        return <BrowserbaseFrame />;
      case THEMES.auth0.id:
        return <Auth0Frame />;
      case THEMES.nuxt.id:
        return <NuxtFrame />;
      case THEMES.gemini.id:
        return <GeminiFrame />;
      case THEMES.cloudflare.id:
        return <CloudflareFrame />;
      case THEMES.stripe.id:
        return <StripeFrame />;
      case THEMES.firecrawl.id:
        return <FirecrawlFrame />;
      default:
        return <DefaultFrame />;
    }
  }

  return (
    <div class={styles.frameContainer} data-theme={themeDarkModeAtom() ? "dark" : "light"}>
      {resize() ? (
        <ResizableFrame>
          <FlashMessage />
          <div class={styles.outerFrame} ref={(el) => setFrameRef(el)} id="frame">
            {renderFrame()}
          </div>
        </ResizableFrame>
      ) : (
        <div class={styles.outerFrame} ref={(el) => setFrameRef(el)} id="frame">
          {renderFrame()}
        </div>
      )}
    </div>
  );
};

export default Frame;
