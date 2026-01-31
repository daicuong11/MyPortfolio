import "./globals.css";
import type { Metadata } from "next";
import { getTranslations } from "@/lib/i18n";
import ClientProviders from "@/components/providers/ClientProviders";

export const metadata: Metadata = {
  title: {
    default: "Ly Dai Cuong | Software Engineer",
    template: "%s | Ly Dai Cuong",
  },
  description:
    "Portfolio of Ly Dai Cuong, Software Engineer specialized in .NET Core, ASP.NET Core, Entity Framework, ABP Framework, Blazor, and modern web technologies.",
  metadataBase: new URL("https://lydaicuong.me"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Ly Dai Cuong | Software Engineer",
    description:
      "Portfolio of Ly Dai Cuong - Software Engineer & AI-Oriented Web Developer",
    url: "https://lydaicuong.me",
    siteName: "Ly Dai Cuong Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 200,
        height: 200,
        alt: "Ly Dai Cuong Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ly Dai Cuong | Software Engineer",
    description: "Portfolio of Ly Dai Cuong - Software Engineer & AI-Oriented Web Developer",
    images: ["/logo.svg"],
  },
  keywords: [
    "Ly Dai Cuong",
    "Lý Đại Cương",
    "Software Engineer",
    "Fullstack Developer",
    ".NET",
    "Fresher",
    "Ton Duc Thang University",
    "Đại học Tôn Đức Thắng",
    "Dong Nai",
    "Đồng Nai",
    "Portfolio",
    "Web Developer",
    "ASP.NET",
    "React",
    "Next.js",
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ly Dai Cuong",
  alternateName: "Lý Đại Cương",
  jobTitle: ["Software Engineer", "Fullstack Developer", "Fresher .NET Developer"],
  url: "https://lydaicuong.me",
  birthDate: "2003",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Dong Nai",
    addressLocality: "Đồng Nai",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Ton Duc Thang University",
    alternateName: "Đại học Tôn Đức Thắng",
  },
  knowsAbout: [
    "Software Engineering",
    "Fullstack Development",
    ".NET",
    "ASP.NET Core",
    "Entity Framework",
    "C#",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Kỹ thuật phần mềm",
    "Lập trình viên",
    "Phần mềm",
    "Ứng dụng web",
    "Website",
    "Blazor",
    "ABP Framework",
    "JavaScript",
    "Database",
    "PostgreSQL",
    "SQL Server",
  ],
  description:
    "Portfolio of Ly Dai Cuong, Software Engineer and Fullstack Developer. Fresher .NET, alumni of Ton Duc Thang University, from Dong Nai.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ClientProviders>
        {children}
        </ClientProviders>
      </body>
    </html>
  );
}
