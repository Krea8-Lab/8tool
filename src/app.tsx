import { MetaProvider, Title, Meta, Link } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/toast";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Code Snippets</Title>
          <Meta name="description" content="Create beautiful images of your code" />
          <Meta name="theme-color" content="#181818" />
          <Link rel="icon" type="image/png" href="/favicon.png" />
          <div class="bg-background text-gray-12 isolate h-full min-h-screen">
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
