"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="relative w-full py-8 bg-black overflow-hidden">
      {/* Animated border top with multiple effects */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        {/* Base border line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Animated scanning light line */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent blur-sm"
        />
        
        {/* Glowing particles moving */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-20px", opacity: 0 }}
            animate={{
              x: ["-20px", "calc(100% + 20px)", "-20px"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 blur-sm"
            style={{
              boxShadow: "0 0 8px rgba(0, 245, 255, 0.8), 0 0 16px rgba(0, 245, 255, 0.4)",
            }}
          />
        ))}
        
        {/* Pulsing glow effect */}
        <motion.div
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 blur-[2px]"
        />
        
        {/* Gradient shimmer effect */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </div>

      {/* Subtle particles glow */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, y: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/30 blur-md"
            style={{
              left: `${10 + i * 12}%`,
              bottom: `${10 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Glow background */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[400px] h-[120px] bg-cyan-500/10 blur-3xl rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4"
      >
        {/* Glowing Name Logo */}
        <h2
          className="text-lg font-semibold tracking-widest bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]"
        >
          {t.footer.name}
        </h2>

        {/* Tech signature */}
        <span className="text-[10px] text-gray-500 tracking-widest uppercase">
          {t.footer.techSignature}
        </span>

        {/* Copyright */}
        <p className="text-xs text-gray-500 text-center md:text-right">
          {t.footer.copyright}
        </p>
      </motion.div>
    </footer>
  );
}
