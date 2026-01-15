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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white overflow-x-hidden">
        <ClientProviders>
        {children}
        </ClientProviders>
      </body>
    </html>
  );
}
