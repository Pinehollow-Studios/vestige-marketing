import type { MetadataRoute } from "next";

/**
 * Live: allow search engines to crawl and index the site.
 *
 * `/unsubscribe` is a GET action handler, not a page — keep crawlers out of
 * it so a bot can't trip the endpoint or list it in results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/unsubscribe" }],
  };
}
