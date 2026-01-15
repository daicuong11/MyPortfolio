import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://lydaicuong.me/",
      lastModified: new Date(),
    },
    {
      url: "https://lydaicuong.me/en/",
      lastModified: new Date(),
    },
    {
      url: "https://lydaicuong.me/vi/",
      lastModified: new Date(),
    },
  ];
}
