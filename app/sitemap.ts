import type { MetadataRoute } from "next";
import { LEGAL_APPS } from "@/lib/apps";
import { SITE } from "@/lib/company";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/legal", "/legal/privacy", "/legal/terms"];
  const appPaths = LEGAL_APPS.flatMap((app) => [
    `/legal/privacy/${app.slug}`,
    `/legal/terms/${app.slug}`,
  ]);

  return [...staticPaths, ...appPaths].map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
