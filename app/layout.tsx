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
    "AI-themed portfolio of Ly Dai Cuong, Software Engineer specialized in Web, AI, and modern technologies.",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Ly Dai Cuong | Software Engineer",
    description:
      "AI Portfolio of Ly Dai Cuong - Web Developer & Software Engineer",
    url: "https://yourdomain.com",
    siteName: "Ly Dai Cuong Portfolio",
    locale: "en_US",
    type: "website",
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
