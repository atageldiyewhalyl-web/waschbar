import { absoluteUrl } from "../seo";

const urls = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/heidelberg", changefreq: "daily", priority: "0.9" },
  { path: "/ludwigshafen", changefreq: "daily", priority: "0.9" },
  { path: "/rabattkarte", changefreq: "weekly", priority: "0.8" },
  {
    path: "/angebote/kundenkarte-guthaben",
    changefreq: "weekly",
    priority: "0.8",
  },
];

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${xmlEscape(absoluteUrl(url.path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
