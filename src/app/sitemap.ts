import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tabrid-rraha.vercel.app",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://tabrid-rraha.vercel.app",
          fr: "https://tabrid-rraha.vercel.app/fr",
        },
      },
    },
    {
      url: "https://tabrid-rraha.vercel.app/fr",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://tabrid-rraha.vercel.app",
          fr: "https://tabrid-rraha.vercel.app/fr",
        },
      },
    },
  ];
}
