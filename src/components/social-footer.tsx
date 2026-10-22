import {
  BrandGithubIcon,
  BrandSlackIcon,
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

export function SocialFooter(props: { referral?: string }) {
  const referral = () => props.referral || "ray-so";
  return (
    <div class="pt-2 mt-auto">
      <div class="flex items-center gap-2 mt-2 justify-between">
        <div
          class="flex items-center gap-1 text-gray-12 group"
        >
          <RaycastLogoNegIcon class="w-6 h-6" />
          <span class="text-[11px] font-medium">Made by Krea8 &</span> 
          <span class="text-[11px] font-medium">Inspired by <em>Raycast</em></span>
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
                  class="text-gray-9 hover:text-gray-11 transition-colors"
                >
                  <Icon class="w-4 h-4" />
                </a>
              );
            }}
          </For>
        </div>
      </div>
    </div>
  );
}
