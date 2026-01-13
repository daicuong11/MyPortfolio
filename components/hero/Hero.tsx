"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { Eye, Download, Languages } from "lucide-react";
import { useTranslations, getLocaleFromPath } from "@/lib/i18n";
import { getPathWithBasePath } from "@/lib/paths";
import CustomCursor from "./CustomCursor";

const SpaceScene = dynamic(() => import("./SpaceScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-black flex items-center justify-center">
      <span className="text-gray-500">Loading space...</span>
    </div>
  ),
});

export default function Hero() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const locale = getLocaleFromPath(pathname);
  const isVI = locale === "vi";

  const cvFileName = locale === "vi" 
    ? "cv/LyDaiCuong_CV_Vi.pdf"
    : "cv/LyDaiCuong_CV_En.pdf";
  const cvFile = getPathWithBasePath(cvFileName, pathname);

  const switchLang = () => {
    if (isVI) {
      router.push(pathname.replace("/vi", "/en"));
    } else {
      router.push(pathname.replace("/en", "/vi"));
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden hero-cursor-area">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* 3D Background */}
      <div className="absolute inset-0">
        <SpaceScene />
      </div>

      {/* Language Switch */}
      <button
        onClick={switchLang}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-cyan-300 hover:bg-cyan-400/20 transition cursor-pointer"
      >
        <Languages size={14} />
        {locale === "vi" ? "EN" : "VI"}
      </button>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1
          className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.9)] tracking-widest"
        >
          {t.hero.title}
        </h1>

        <p className="mt-4 text-lg text-slate-300/80">
          {t.hero.subtitle}
        </p>

        {/* Action buttons */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          {/* Preview CV */}
          <a
            href={cvFile}
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-cyan-300 hover:bg-cyan-400/20 transition"
          >
            <Eye size={16} />
            {t.hero.previewCV}
          </a>

          {/* Download CV */}
          <a
            href={cvFile}
            download
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
          >
            <Download size={16} />
            {t.hero.downloadCV}
          </a>
        </div>
      </div>

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/10 blur-[120px]" />
    </section>
  );
}
