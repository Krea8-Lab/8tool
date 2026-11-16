import { MetaProvider, Title, Meta, Link } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Navigation } from "~/components/navigation";
import { Toaster } from "~/components/toast";

import "./index.css";

const SITE_URL = "https://8tool.netlify.app";
const OG_IMAGE_URL = `${SITE_URL}/og.png`;
const SITE_TITLE = "Code Snippets";
const SITE_DESCRIPTION = "Create beautiful images of your code";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>{SITE_TITLE}</Title>
          <Meta name="description" content={SITE_DESCRIPTION} />
          <Meta name="theme-color" content="#181818" />

          {/* Open Graph / Facebook */}
          <Meta property="og:type" content="website" />
          <Meta property="og:url" content={SITE_URL} />
          <Meta property="og:site_name" content="8tool" />
          <Meta property="og:title" content={SITE_TITLE} />
          <Meta property="og:description" content={SITE_DESCRIPTION} />
          <Meta property="og:image" content={OG_IMAGE_URL} />
          <Meta property="og:image:secure_url" content={OG_IMAGE_URL} />
          <Meta property="og:image:type" content="image/png" />
          <Meta property="og:image:width" content="1200" />
          <Meta property="og:image:height" content="630" />
          <Meta
            property="og:image:alt"
            content="Code Snippets - Create beautiful images of your code"
          />

          {/* Twitter / X */}
          <Meta name="twitter:card" content="summary_large_image" />
          <Meta name="twitter:title" content={SITE_TITLE} />
          <Meta name="twitter:description" content={SITE_DESCRIPTION} />
          <Meta name="twitter:image" content={OG_IMAGE_URL} />
          <Meta
            name="twitter:image:alt"
            content="Code Snippets - Create beautiful images of your code"
          />

          <Link rel="icon" type="image/png" href="/favicon.png" />
          <div class="isolate h-full min-h-screen bg-background text-foreground">
            <Navigation />
            <main class="flex min-h-full flex-col pt-[50px]">
              <Suspense>{props.children}</Suspense>
            </main>
            <Toaster />
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
