import type { MetadataRoute } from "next";
import { SITE } from "@/lib/company";

/** 심사 봇이 읽어야 하므로 아무것도 막지 않는다. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
