export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://waschbar.eu"
).replace(/\/$/, "");

export function absoluteUrl(path = "") {
  return `${siteUrl}${path.startsWith("/") || path === "" ? path : `/${path}`}`;
}
