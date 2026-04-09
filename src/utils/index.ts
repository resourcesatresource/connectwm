import type { IconSvgElement } from "@hugeicons/core-free-icons";
import {
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  VideoIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";

const PLATFORM_META = [
  { match: "facebook", label: "Facebook", icon: FacebookIcon },
  { match: "instagram", label: "Instagram", icon: InstagramIcon },
  { match: "linkedin", label: "LinkedIn", icon: LinkedinIcon },
  { match: "twitter", label: "Twitter", icon: TwitterIcon },
  { match: "x.com", label: "X", icon: TwitterIcon },
  { match: "youtube", label: "YouTube", icon: YoutubeIcon },
  { match: "movies", label: "Movies", icon: VideoIcon },
];

export const getPlatformMeta = (
  url: string,
  fallbackName?: string
): { icon: IconSvgElement; label: string } => {
  const normalizedUrl = url.toLowerCase();

  for (const platform of PLATFORM_META) {
    if (normalizedUrl.includes(platform.match)) {
      return { icon: platform.icon, label: platform.label };
    }
  }

  return { icon: GlobeIcon, label: fallbackName || "Website" };
};
