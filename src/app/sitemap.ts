import type { MetadataRoute } from "next";
import { getBaseUrl } from "../lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = getBaseUrl();

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}
