"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n";
import { useThemeColors } from "@/hooks/useThemeColors";

function Footer() {
  const t = useTranslations();
  const { colors, getTitleGradient } = useThemeColors();

  return (
    <footer className="relative w-full py-16 bg-gradient-to-b from-black to-[#050510] overflow-hidden">
      {/* Enhanced animated border top - themed */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, rgba(${colors.accent}, 0.4), transparent)`,
          }}
        />
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, rgba(${colors.accent}, 1), transparent)`,
          }}
        />
      </div>

      {/* Background effects - themed */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute -top-20 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: `rgba(${colors.primary}, 0.05)` }}
        />
        <div 
          className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: `rgba(${colors.secondary}, 0.05)` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand section */}
          <div className="space-y-4">
            <motion.h2
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold"
              style={{
                ...getTitleGradient(),
                filter: `drop-shadow(0 0 16px rgba(${colors.primary}, 0.6))`,
              }}
            >
              {t.footer.name}
            </motion.h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: "github", link: "https://github.com/daicuong11" },
                { icon: "linkedin", link: "https://linkedin.com" },
                { icon: "email", link: "mailto:daicuongld789@gmail.com" }
              ].map((social, i) => (
                <motion.a
                  key={social.icon}
                  href={social.link}
                  target="_blank"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border flex items-center justify-center transition-all duration-300 cursor-pointer"
                  style={{ borderColor: `rgba(${colors.accent}, 0.1)` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.5)`;
                    e.currentTarget.style.boxShadow = `0 10px 30px rgba(${colors.primary}, 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.1)`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {social.icon === "github" && (
                    <svg className="w-5 h-5 text-gray-400 hover:text-cyan-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {social.icon === "linkedin" && (
                    <svg className="w-5 h-5 text-gray-400 hover:text-cyan-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )}
                  {social.icon === "email" && (
                    <svg className="w-5 h-5 text-gray-400 hover:text-cyan-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.quickLinks.title}
            </h3>
            <div className="space-y-2">
              {[
                { label: t.footer.quickLinks.projects, href: "#projects" },
                { label: t.footer.quickLinks.skills, href: "#skills" },
                { label: t.footer.quickLinks.contact, href: "#contact" }
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4, color: "#22d3ee" }}
                  className="block text-sm text-gray-400 hover:text-cyan-300 transition-all duration-200"
                >
                  → {link.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.builtWith.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {t.footer.builtWith.techs.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 text-xs rounded-lg border transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgba(${colors.accent}, 0.1), rgba(${colors.primary}, 0.1))`,
                    color: `rgba(${colors.accent}, 0.9)`,
                    borderColor: `rgba(${colors.accent}, 0.2)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.5)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.2)`;
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              {t.footer.copyright}
            </p>

            {/* Tech signature with badge */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-300 text-xs font-medium">
                ● {t.footer.status.online}
              </span>
              <span className="text-xs text-gray-500 tracking-wider uppercase">
                {t.footer.techSignature}
              </span>
            </div>

            {/* Back to top */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(${colors.primary}, 0.2), rgba(${colors.secondary}, 0.2))`,
                borderColor: `rgba(${colors.accent}, 0.3)`,
                color: `rgba(${colors.accent}, 0.9)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.6)`;
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(${colors.primary}, 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.3)`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {t.footer.backToTop}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default memo(Footer);
