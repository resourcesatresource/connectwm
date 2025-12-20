const supportedPlatformNames = [
  "facebook",
  "instagram",
  "linkedin",
  "twitter",
  "youtube",
  "movies",
];

const ICONS = {
  facebook: "fab fa-facebook",
  instagram: "fab fa-instagram",
  linkedin: "fab fa-linkedin",
  twitter: "fab fa-twitter",
  youtube: "fab fa-youtube",
  movies: "fas fa-video",
  link: "fas fa-link",
};

export const getIconForPlatform = (url: string) => {
  for (const platformName of supportedPlatformNames) {
    if (url.includes(platformName)) {
      return ICONS[platformName as keyof typeof ICONS];
    }
  }

  return ICONS.link;
};
