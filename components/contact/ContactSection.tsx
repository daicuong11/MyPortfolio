"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Download, Eye } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations, getLocaleFromPath } from "@/lib/i18n";
import { getFileUrl } from "@/lib/paths";
import CosmicBackground from "@/components/shared/CosmicBackground";
import { useThemeColors } from "@/hooks/useThemeColors";

function ContactSection() {
  const pathname = usePathname();
  const t = useTranslations();
  const locale = getLocaleFromPath(pathname);
  const { colors, getTitleGradient } = useThemeColors();

  const cvFileName = locale === "vi"
    ? "cv/LyDaiCuong_CV_Vi.pdf"
    : "cv/LyDaiCuong_CV_En.pdf";
  const cvFile = getFileUrl(cvFileName);

  return (
    <section id="contact" className="relative py-40 px-6 bg-black overflow-hidden">
      {/* Cosmic Background */}
      <CosmicBackground intensity="strong" />
      
      {/* cinematic lights - themed */}
      <div 
        className="absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full blur-[160px]"
        style={{ backgroundColor: `rgba(${colors.primary}, 0.2)` }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px]"
        style={{ backgroundColor: `rgba(${colors.secondary}, 0.2)` }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold mb-6 leading-normal"
          style={{
            ...getTitleGradient(),
            filter: `drop-shadow(0 0 20px rgba(${colors.primary}, 0.8))`,
          }}
        >
          {t.contact.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl"
        >
          {/* Contact cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {/* Email Card */}
            <motion.a
              href={t.contact.email.link}
              target="_blank"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-4 md:p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border backdrop-blur-xl transition-all duration-300 cursor-pointer"
              style={{
                borderColor: `rgba(${colors.accent}, 0.1)`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.6)`;
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(${colors.primary}, 0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.1)`;
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 0), rgba(${colors.secondary}, 0.1))`,
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 flex items-start gap-3">
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 0.2), rgba(${colors.secondary}, 0.2))`,
                    borderColor: `rgba(${colors.accent}, 0.3)`,
                  }}
                >
                  <Mail style={{ color: `rgba(${colors.accent}, 0.9)` }} className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs md:text-sm font-medium text-gray-400 mb-1">{t.contact.email.label}</h3>
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-white transition-colors break-words leading-tight">
                    {t.contact.email.value}
                  </p>
                </div>
              </div>
              
              {/* Corner accent */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(${colors.accent}, 0.2), transparent)`,
                }}
              />
            </motion.a>

            {/* GitHub Card */}
            <motion.a
              href={t.contact.github.link}
              target="_blank"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-4 md:p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border backdrop-blur-xl transition-all duration-300 cursor-pointer"
              style={{
                borderColor: `rgba(${colors.accent}, 0.1)`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.secondary}, 0.6)`;
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(${colors.secondary}, 0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.1)`;
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(${colors.secondary}, 0), rgba(${colors.accent}, 0.1))`,
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 flex items-start gap-3">
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(${colors.secondary}, 0.2), rgba(${colors.accent}, 0.2))`,
                    borderColor: `rgba(${colors.secondary}, 0.3)`,
                  }}
                >
                  <Github style={{ color: `rgba(${colors.secondary}, 0.9)` }} className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs md:text-sm font-medium text-gray-400 mb-1">{t.contact.github.label}</h3>
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-white transition-colors break-words leading-tight">
                    {t.contact.github.value}
                  </p>
                </div>
              </div>
              
              {/* Corner accent */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(${colors.secondary}, 0.2), transparent)`,
                }}
              />
            </motion.a>

            {/* LinkedIn Card */}
            <motion.a
              href={t.contact.linkedin.link}
              target="_blank"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-4 md:p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border backdrop-blur-xl transition-all duration-300 cursor-pointer"
              style={{
                borderColor: `rgba(${colors.accent}, 0.1)`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.primary}, 0.6)`;
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(${colors.primary}, 0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.1)`;
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 0), rgba(${colors.accent}, 0.1))`,
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 flex items-start gap-3">
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 0.2), rgba(${colors.accent}, 0.2))`,
                    borderColor: `rgba(${colors.primary}, 0.3)`,
                  }}
                >
                  <Linkedin style={{ color: `rgba(${colors.primary}, 0.9)` }} className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs md:text-sm font-medium text-gray-400 mb-1">{t.contact.linkedin.label}</h3>
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-white transition-colors break-words leading-tight">
                    {t.contact.linkedin.value}
                  </p>
                </div>
              </div>
              
              {/* Corner accent */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 0.2), transparent)`,
                }}
              />
            </motion.a>

            {/* CV Preview Card */}
            <motion.a
              href={cvFile}
              target="_blank"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-4 md:p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border backdrop-blur-xl transition-all duration-300 cursor-pointer"
              style={{
                borderColor: `rgba(${colors.accent}, 0.1)`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.6)`;
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(${colors.accent}, 0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.1)`;
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(${colors.accent}, 0), rgba(${colors.primary}, 0.1))`,
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 flex items-start gap-3">
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(${colors.accent}, 0.2), rgba(${colors.primary}, 0.2))`,
                    borderColor: `rgba(${colors.accent}, 0.3)`,
                  }}
                >
                  <Eye style={{ color: `rgba(${colors.accent}, 0.9)` }} className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs md:text-sm font-medium text-gray-400 mb-1">{t.contact.previewCV.label}</h3>
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-white transition-colors break-words leading-tight">
                    {t.contact.previewCV.value}
                  </p>
                </div>
              </div>
              
              {/* Corner accent */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(${colors.accent}, 0.2), transparent)`,
                }}
              />
            </motion.a>
          </div>

          {/* CV Download - Prominent CTA */}
          <motion.a
            href={cvFile}
            download
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group relative block p-4 md:p-6 lg:p-8 rounded-2xl border-2 backdrop-blur-xl transition-all duration-300 overflow-hidden cursor-pointer"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(${colors.primary}, 0.2), rgba(${colors.secondary}, 0.2), rgba(${colors.primary}, 0.2))`,
              borderColor: `rgba(${colors.accent}, 0.4)`,
              boxShadow: `0 8px 32px rgba(${colors.primary}, 0.3)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.8)`;
              e.currentTarget.style.boxShadow = `0 12px 48px rgba(${colors.primary}, 0.5)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.4)`;
              e.currentTarget.style.boxShadow = `0 8px 32px rgba(${colors.primary}, 0.3)`;
            }}
          >
            {/* Animated background */}
            <motion.div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(${colors.primary}, 0), rgba(${colors.primary}, 0.2), rgba(${colors.primary}, 0))`,
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
                <div 
                  className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg flex-shrink-0"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 1), rgba(${colors.secondary}, 1))`,
                  }}
                >
                  <Download className="text-white w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                </div>
                <div className="min-w-0">
                  <h3 
                    className="text-xs md:text-sm font-medium mb-0.5 md:mb-1 uppercase tracking-wider"
                    style={{ color: `rgba(${colors.accent}, 0.9)` }}
                  >
                    {t.contact.downloadCV.label}
                  </h3>
                  <p className="text-base md:text-xl lg:text-2xl font-bold text-white transition-colors truncate">
                    {t.contact.downloadCV.value}
                  </p>
                </div>
              </div>
              
              {/* Arrow indicator - hidden on mobile */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                style={{ color: `rgba(${colors.accent}, 0.9)` }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.div>
            </div>
            
            {/* Particles effect */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-cyan-400/60"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ContactSection);
