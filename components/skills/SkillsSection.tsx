"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n";
import CosmicBackground from "@/components/shared/CosmicBackground";

function SkillsSection() {
  const t = useTranslations();

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black to-[#050a1a] overflow-hidden">

      {/* cinematic light blobs */}
      <div className="absolute -top-40 left-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[160px] -translate-x-1/2" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[160px]" />
      <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-20 leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.8)]"
        >
        {t.skills.title}
        </motion.h2>



        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.skills.groups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
              whileHover={{ 
                y: -8, 
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/60 transition-all duration-300 will-change-transform shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(6,182,212,0.4)] cursor-pointer"
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(0)"
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500 opacity-0 group-hover:opacity-100" />
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-pulse" />
                  <h3 className="text-xl font-bold leading-normal bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:to-purple-300 transition-all duration-300">
                    {group.title}
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {group.items.map((item, itemIdx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08 + itemIdx * 0.05 }}
                        whileHover={{ 
                          scale: 1.15, 
                          y: -4,
                          transition: { duration: 0.2 }
                        }}
                        className="group/item relative flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 cursor-pointer"
                      >
                        {/* Icon glow on hover */}
                        <div className="absolute inset-0 rounded-xl bg-cyan-400/0 group-hover/item:bg-cyan-400/5 blur-sm transition-all duration-300" />
                        
                        <Icon 
                          size={32} 
                          className="text-cyan-300 group-hover/item:text-cyan-200 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] relative z-10" 
                        />
                        <span className="text-[10px] text-gray-400 group-hover/item:text-cyan-300 mt-2 font-medium transition-colors duration-300 text-center leading-tight relative z-10">
                          {item.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(SkillsSection);
