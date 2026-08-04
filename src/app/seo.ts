const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.waschbar.eu";

export const siteUrl = configuredSiteUrl
  .replace(/^https?:\/\/waschbar\.eu/i, "https://www.waschbar.eu")
  .replace(/\/$/, "");

export function absoluteUrl(path = "") {
  return `${siteUrl}${path.startsWith("/") || path === "" ? path : `/${path}`}`;
}
