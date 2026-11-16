import { Icon } from "@iconify-icon/solid";
import { Title, Meta } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { Krea8LogoIcon } from "~/assets/icons";
import { Button } from "~/components/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Title>404: Route Not Found | Code Snippets</Title>
      <Meta name="robots" content="noindex, nofollow" />
      <HttpStatusCode code={404} />

      <div class="relative flex flex-col gap-2.5 text-balance min-h-[calc(100dvh-50px)] w-full items-center justify-center overflow-hidden p-4 sm:p-6 md:p-8">
        <Krea8LogoIcon class="size-15 md:size-20" />
        <h1 class="text-lg md:text-6xl font-bold">Page not found.</h1>
        <p class="text-base md:text-lg text-muted-foreground">
          This page does not exist, please head back home and try again.
        </p>
        <Button variant="primary" size="large" onClick={() => navigate("/")}>
          <Icon icon="charm:chevron-left" />
          Back to homepage
        </Button>
      </div>
    </>
  );
}
