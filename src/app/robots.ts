import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "*",
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Google-Extended",
          "Bingbot",
          "ClaudeBot",
        ],
        allow: "/",
        disallow: ["/gutschein-einloesen"],
      },
    ],
  };
}
