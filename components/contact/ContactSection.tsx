"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Download, Eye } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations, getLocaleFromPath } from "@/lib/i18n";
import { getFileUrl } from "@/lib/paths";
import CosmicBackground from "@/components/shared/CosmicBackground";

function ContactSection() {
  const pathname = usePathname();
  const t = useTranslations();
  const locale = getLocaleFromPath(pathname);

  const cvFileName = locale === "vi"
    ? "cv/LyDaiCuong_CV_Vi.pdf"
    : "cv/LyDaiCuong_CV_En.pdf";
  const cvFile = getFileUrl(cvFileName);

  return (
    <section className="relative py-40 px-6 bg-black overflow-hidden">
      {/* Cosmic Background */}
      <CosmicBackground variant="blue" intensity="strong" />
      
      {/* cinematic lights */}
      <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[160px]" />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold mb-6 leading-normal bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
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
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Email Card */}
            <motion.a
              href={t.contact.email.link}
              target="_blank"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-cyan-400/60 backdrop-blur-xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Mail className="text-cyan-300" size={24} />
                </div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">{t.contact.email.label}</h3>
                <p className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors break-all">
                  {t.contact.email.value}
                </p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-purple-400/60 backdrop-blur-xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(168,85,247,0.4)]"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Github className="text-purple-300" size={24} />
                </div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">{t.contact.github.label}</h3>
                <p className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {t.contact.github.value}
                </p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-blue-400/60 backdrop-blur-xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.4)]"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Linkedin className="text-blue-300" size={24} />
                </div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">{t.contact.linkedin.label}</h3>
                <p className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {t.contact.linkedin.value}
                </p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-green-400/60 backdrop-blur-xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(34,197,94,0.4)]"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Eye className="text-green-300" size={24} />
                </div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">{t.contact.previewCV.label}</h3>
                <p className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors">
                  {t.contact.previewCV.value}
                </p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            className="group relative block p-8 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 border-2 border-cyan-400/40 hover:border-cyan-400/80 backdrop-blur-xl transition-all duration-300 shadow-[0_8px_32px_rgba(6,182,212,0.3)] hover:shadow-[0_12px_48px_rgba(6,182,212,0.5)] overflow-hidden cursor-pointer"
          >
            {/* Animated background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <Download className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cyan-300 mb-1 uppercase tracking-wider">
                    {t.contact.downloadCV.label}
                  </h3>
                  <p className="text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {t.contact.downloadCV.value}
                  </p>
                </div>
              </div>
              
              {/* Arrow indicator */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity"
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
