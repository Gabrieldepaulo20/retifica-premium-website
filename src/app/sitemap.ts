import { MetadataRoute } from "next";
import { absoluteUrl, sitePages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitePages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    images: page.images.map((image) => absoluteUrl(image)),
  }));
}
