"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { themeNames } from "@/lib/themes";
import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "@/lib/i18n";
import { useThemeColors } from "@/hooks/useThemeColors";
import type { ThemeName } from "@/contexts/ThemeContext";

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme } = useTheme();
  const { colors } = useThemeColors();
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const isVI = locale === "vi";

  const themes: ThemeName[] = ["space", "spring", "summer", "autumn", "winter"];

  return (
    <>
      {/* Theme Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 left-6 z-[10000] flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full backdrop-blur-sm border transition cursor-pointer"
        style={{
          backgroundColor: `rgba(${colors.primary}, 0.15)`,
          borderColor: `rgba(${colors.accent}, 0.3)`,
          color: `rgb(${colors.accent})`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `rgba(${colors.primary}, 0.25)`;
          e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.5)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = `rgba(${colors.primary}, 0.15)`;
          e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.3)`;
        }}
      >
        <Palette size={14} />
        <span className="hidden sm:inline">
          {themeNames[currentTheme].icon}
        </span>
      </motion.button>

      {/* Theme Selector Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100001] cursor-pointer"
            />

            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100002] w-[95%] sm:w-[90%] max-w-2xl"
            >
              <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border-2 border-cyan-400/30 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-[0_0_80px_rgba(6,182,212,0.3)]">
                {/* Close button */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-400/40 flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </motion.button>

                {/* Header */}
                <div className="text-center mb-4 md:mb-6 lg:mb-8">
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-1 md:mb-2"
                  >
                    {isVI ? "Chọn Chủ Đề" : "Choose Theme"}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-xs md:text-sm"
                  >
                    {isVI ? "Khám phá portfolio qua 4 mùa" : "Explore portfolio through seasons"}
                  </motion.p>
                </div>

                {/* Theme Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
                  {themes.map((theme, index) => {
                    const isActive = currentTheme === theme;
                    const themeInfo = themeNames[theme];

                    return (
                      <motion.button
                        key={theme}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          setTheme(theme);
                          setTimeout(() => setIsOpen(false), 300);
                        }}
                        whileHover={{ y: -8, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`group relative p-3 md:p-4 lg:p-6 rounded-xl md:rounded-2xl backdrop-blur-xl transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border-2 border-cyan-400"
                            : "bg-white/5 border-2 border-white/10 hover:border-cyan-400/50"
                        }`}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTheme"
                            className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20"
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                          />
                        )}

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center gap-1.5 md:gap-2 lg:gap-3">
                          <motion.span
                            className="text-3xl md:text-4xl lg:text-5xl"
                            animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            {themeInfo.icon}
                          </motion.span>
                          <div className="text-center">
                            <p className="text-white font-semibold text-xs md:text-sm">
                              {isVI ? themeInfo.vi : themeInfo.en}
                            </p>
                          </div>
                        </div>

                        {/* Hover glow */}
                        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-all duration-300" />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Footer hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-xs text-gray-500 mt-3 md:mt-4 lg:mt-6"
                >
                  {isVI 
                    ? "💡 Lựa chọn của bạn sẽ được lưu lại" 
                    : "💡 Your choice will be saved"}
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
