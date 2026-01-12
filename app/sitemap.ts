import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yourdomain.com/en",
      lastModified: new Date(),
    },
    {
      url: "https://yourdomain.com/vi",
      lastModified: new Date(),
    },
  ];
}
