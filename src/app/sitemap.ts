import { MetadataRoute } from "next";
import {
  absoluteUrl,
  siteContentLastModified,
  sitePages,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: siteContentLastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    images: page.images.map((image) => absoluteUrl(image)),
  }));
}
