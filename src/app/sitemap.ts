import { MetadataRoute } from "next";
import {
  absoluteUrl,
  sitePages,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    images: page.images.map((image) => absoluteUrl(image)),
  }));
}
