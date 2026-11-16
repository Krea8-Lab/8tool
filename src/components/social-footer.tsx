import { For } from "solid-js";
import { BrandGithubIcon, BrandXIcon, BrandYoutubeIcon, Krea8LogoIcon } from "~/components/icons";

const socialLinks = [
  {
    href: "https://github.com/Krea8-Lab",
    label: "GitHub",
    icon: BrandGithubIcon,
  },
  {
    href: "https://x.com/abhinav_twts",
    label: "X",
    icon: BrandXIcon,
  },
  {
    href: "https://www.youtube.com/@devabhinav",
    label: "YouTube",
    icon: BrandYoutubeIcon,
  },
];

export function SocialFooter(_props?: { referral?: string }) {
  return (
    <div class="mt-auto pt-2">
      <div class="mt-2 flex items-center justify-between gap-2">
        <div class="group flex items-center gap-1">
          <Krea8LogoIcon class="h-6 w-6" />
          <span class="text-[11px] font-medium">Forked by Krea8 &</span>
          <span class="text-[11px] font-medium">
            Inspired by <em>Raycast</em>
          </span>
        </div>
        <div class="flex gap-3">
          <For each={socialLinks}>
            {(link) => {
              const Icon = link.icon;
              return (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  class="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon class="h-4 w-4" />
                </a>
              );
            }}
          </For>
        </div>
      </div>
    </div>
  );
}
