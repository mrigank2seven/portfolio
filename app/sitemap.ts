import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getCaseStudySlugs } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const posts = getAllPosts();
  return [
    { url: `${base}/` },
    { url: `${base}/blog` },
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date })),
    ...getCaseStudySlugs().map((slug) => ({ url: `${base}/projects/${slug}` })),
  ];
}
