"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { Eye, Download, Languages } from "lucide-react";
import { useTranslations, getLocaleFromPath } from "@/lib/i18n";
import { getFileUrl } from "@/lib/paths";
import CustomCursor from "./CustomCursor";
import AuroraBackground from "./AuroraBackground";
import SpringBackground from "./SpringBackground";
import SummerBackground from "./SummerBackground";
import AutumnBackground from "./AutumnBackground";
import WinterBackground from "./WinterBackground";
import ThemeSelector from "@/components/shared/ThemeSelector";
import { useTheme } from "@/contexts/ThemeContext";
import { useThemeColors } from "@/hooks/useThemeColors";

const SpaceScene = dynamic(() => import("./SpaceScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#02040f]" />
  ),
});

function Hero() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const locale = getLocaleFromPath(pathname);
  const isVI = locale === "vi";
  const { currentTheme } = useTheme();
  const { colors, getTitleGradient } = useThemeColors();

  const cvFileName = locale === "vi" 
    ? "cv/LyDaiCuong_CV_Vi.pdf"
    : "cv/LyDaiCuong_CV_En.pdf";
  const cvFile = getFileUrl(cvFileName);

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
      
      {/* Enhanced Background Layers - Theme Based */}
      <div className="absolute inset-0">
        {currentTheme === "space" && (
          <>
            <SpaceScene />
            <AuroraBackground />
          </>
        )}
        {currentTheme === "spring" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-pink-950 via-pink-900/50 to-black" />
            <SpringBackground />
          </>
        )}
        {currentTheme === "summer" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-950 via-orange-900/50 to-black" />
            <SummerBackground />
          </>
        )}
        {currentTheme === "autumn" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-orange-950 via-amber-900/50 to-black" />
            <AutumnBackground />
          </>
        )}
        {currentTheme === "winter" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-cyan-900/50 to-black" />
            <WinterBackground />
          </>
        )}
      </div>

      {/* Theme Selector */}
      <ThemeSelector />

      {/* Language Switch */}
      <button
        onClick={switchLang}
        className="fixed top-6 right-6 z-40 flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full backdrop-blur-sm bg-white/10 border border-white/20 text-cyan-300 hover:bg-cyan-400/20 transition cursor-pointer"
        style={{ 
          cursor: 'pointer',
          pointerEvents: 'auto',
          isolation: 'isolate'
        }}
      >
        <Languages size={14} />
        {locale === "vi" ? "EN" : "VI"}
      </button>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1
          className="text-5xl md:text-7xl font-extrabold leading-tight tracking-widest"
          style={{
            ...getTitleGradient(),
            filter: `drop-shadow(0 0 30px rgba(${colors.primary}, 0.9))`,
          }}
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

      {/* Enhanced bottom glow with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-purple-900/20 via-cyan-500/10 to-transparent blur-[80px] will-change-transform" />
      
      {/* Floating light orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-[20%] w-32 h-32 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: `rgba(${colors.secondary}, 0.2)` }}
        />
        <div 
          className="absolute top-40 right-[15%] w-40 h-40 rounded-full blur-3xl animate-pulse"
          style={{ 
            backgroundColor: `rgba(${colors.primary}, 0.2)`,
            animationDelay: '1s',
          }}
        />
        <div 
          className="absolute bottom-32 left-[30%] w-36 h-36 rounded-full blur-3xl animate-pulse"
          style={{ 
            backgroundColor: `rgba(${colors.accent}, 0.2)`,
            animationDelay: '2s',
          }}
        />
      </div>
    </section>
  );
}

export default memo(Hero);
