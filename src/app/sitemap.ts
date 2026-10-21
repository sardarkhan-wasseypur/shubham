import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/seo";
import { practiceAreas } from "@/content/practiceAreas";
import { articles } from "@/content/articles";
import { hasVerifiedGalleryItems } from "@/content/gallery";

export default function sitemap(): MetadataRoute.Sitemap {
  // Use fixed ISO date for sitemap stability
  const buildDate = new Date().toISOString();

  // Primary static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/practice-areas`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/professional-experience`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/disclaimer`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Practice area service pages (6 indexable landing pages)
  const serviceRoutes: MetadataRoute.Sitemap = practiceAreas.map((area) => ({
    url: `${siteUrl}/${area.slug}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Legal Insights: Thin page (0 articles) is noindexed and excluded from sitemap.
  // When verified articles exist, include index and individual slugs.
  const articleRoutes: MetadataRoute.Sitemap = [];
  if (articles.length > 0) {
    articleRoutes.push({
      url: `${siteUrl}/legal-insights`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.7,
    });
    articles.forEach((art) => {
      articleRoutes.push({
        url: `${siteUrl}/legal-insights/${art.slug}`,
        lastModified: art.publishedAt || buildDate,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  }

  const galleryRoutes: MetadataRoute.Sitemap = hasVerifiedGalleryItems()
    ? [
        {
          url: `${siteUrl}/gallery`,
          lastModified: buildDate,
          changeFrequency: "weekly",
          priority: 0.7,
        },
      ]
    : [];

  return [...staticRoutes, ...serviceRoutes, ...galleryRoutes, ...articleRoutes];
}
