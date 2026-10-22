import {
  BrandGithubIcon,
  BrandXIcon,
  BrandYoutubeIcon,
  RaycastLogoNegIcon,
} from "@/components/icons";
import { For } from "solid-js";

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
        <div class="group flex items-center gap-1 text-gray-12">
          <RaycastLogoNegIcon class="h-6 w-6" />
          <span class="text-[11px] font-medium">Made by Krea8 &</span>
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
                  class="text-gray-9 transition-colors hover:text-gray-11"
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
