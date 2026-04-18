import type { IconSvgElement } from "@hugeicons/react";
import {
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  VideoIcon,
  YoutubeIcon,
  GithubIcon,
  TwitchIcon,
  TelegramIcon,
  SnapchatIcon,
  PinterestIcon,
  RedditIcon,
  SpotifyIcon,
  TiktokIcon,
  WhatsappIcon,
  MailIcon,
  LinkIcon,
  CodeIcon,
  BriefcaseIcon,
  UserIcon,
  StarIcon,
  FavouriteIcon,
  MusicNote01Icon,
  Camera01Icon,
  GameController01Icon,
  BookOpen01Icon,
  ShoppingBag01Icon,
} from "@hugeicons/core-free-icons";

export interface IconOption {
  name: string;
  label: string;
  icon: IconSvgElement;
}

export const ICON_OPTIONS: IconOption[] = [
  { name: "globe", label: "Globe", icon: GlobeIcon },
  { name: "link", label: "Link", icon: LinkIcon },
  { name: "facebook", label: "Facebook", icon: FacebookIcon },
  { name: "instagram", label: "Instagram", icon: InstagramIcon },
  { name: "linkedin", label: "LinkedIn", icon: LinkedinIcon },
  { name: "twitter", label: "Twitter / X", icon: TwitterIcon },
  { name: "youtube", label: "YouTube", icon: YoutubeIcon },
  { name: "github", label: "GitHub", icon: GithubIcon },
  { name: "twitch", label: "Twitch", icon: TwitchIcon },
  { name: "telegram", label: "Telegram", icon: TelegramIcon },
  { name: "snapchat", label: "Snapchat", icon: SnapchatIcon },
  { name: "pinterest", label: "Pinterest", icon: PinterestIcon },
  { name: "reddit", label: "Reddit", icon: RedditIcon },
  { name: "spotify", label: "Spotify", icon: SpotifyIcon },
  { name: "tiktok", label: "TikTok", icon: TiktokIcon },
  { name: "whatsapp", label: "WhatsApp", icon: WhatsappIcon },
  { name: "mail", label: "Email", icon: MailIcon },
  { name: "code", label: "Code", icon: CodeIcon },
  { name: "briefcase", label: "Work", icon: BriefcaseIcon },
  { name: "user", label: "Profile", icon: UserIcon },
  { name: "star", label: "Star", icon: StarIcon },
  { name: "heart", label: "Heart", icon: FavouriteIcon },
  { name: "music", label: "Music", icon: MusicNote01Icon },
  { name: "camera", label: "Photo", icon: Camera01Icon },
  { name: "game", label: "Gaming", icon: GameController01Icon },
  { name: "book", label: "Blog", icon: BookOpen01Icon },
  { name: "shop", label: "Shop", icon: ShoppingBag01Icon },
  { name: "video", label: "Video", icon: VideoIcon },
];

const ICON_MAP: Record<string, IconSvgElement> = Object.fromEntries(
  ICON_OPTIONS.map((o) => [o.name, o.icon])
);

const PLATFORM_META = [
  { match: "facebook", label: "Facebook", icon: FacebookIcon },
  { match: "instagram", label: "Instagram", icon: InstagramIcon },
  { match: "linkedin", label: "LinkedIn", icon: LinkedinIcon },
  { match: "twitter", label: "Twitter", icon: TwitterIcon },
  { match: "x.com", label: "X", icon: TwitterIcon },
  { match: "youtube", label: "YouTube", icon: YoutubeIcon },
  { match: "github", label: "GitHub", icon: GithubIcon },
  { match: "twitch", label: "Twitch", icon: TwitchIcon },
  { match: "telegram", label: "Telegram", icon: TelegramIcon },
  { match: "snapchat", label: "Snapchat", icon: SnapchatIcon },
  { match: "pinterest", label: "Pinterest", icon: PinterestIcon },
  { match: "reddit", label: "Reddit", icon: RedditIcon },
  { match: "spotify", label: "Spotify", icon: SpotifyIcon },
  { match: "tiktok", label: "TikTok", icon: TiktokIcon },
  { match: "whatsapp", label: "WhatsApp", icon: WhatsappIcon },
  { match: "movies", label: "Movies", icon: VideoIcon },
];

export const getPlatformMeta = (
  url: string,
  fallbackName?: string,
  customIcon?: string
): { icon: IconSvgElement; label: string } => {
  if (customIcon && ICON_MAP[customIcon]) {
    return { icon: ICON_MAP[customIcon], label: fallbackName || "Website" };
  }

  const normalizedUrl = url.toLowerCase();
  for (const platform of PLATFORM_META) {
    if (normalizedUrl.includes(platform.match)) {
      return { icon: platform.icon, label: platform.label };
    }
  }

  return { icon: GlobeIcon, label: fallbackName || "Website" };
};
