import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://daicuong11.github.io/MyPortfolio/en",
      lastModified: new Date(),
    },
    {
      url: "https://daicuong11.github.io/MyPortfolio/vi",
      lastModified: new Date(),
    },
  ];
}
