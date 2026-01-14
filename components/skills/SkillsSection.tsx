"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n";
import CosmicBackground from "@/components/shared/CosmicBackground";
import { useThemeColors } from "@/hooks/useThemeColors";

function SkillsSection() {
  const t = useTranslations();
  const { colors, getTitleGradient, getGlowStyle, getBorderStyle, getHoverBorderStyle, getHoverShadowStyle } = useThemeColors();

  return (
    <section id="skills" className="relative py-32 px-6 bg-gradient-to-b from-black to-[#050a1a] overflow-hidden">

      {/* cinematic light blobs - themed */}
      <div 
        className="absolute -top-40 left-1/2 w-[600px] h-[600px] rounded-full blur-[160px] -translate-x-1/2"
        style={{ backgroundColor: `rgba(${colors.primary}, 0.2)` }}
      />
        <div 
          className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full blur-[160px]"
          style={{ backgroundColor: `rgba(${colors.secondary}, 0.2)` }}
        />
      <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-20 leading-tight"
        style={{
          ...getTitleGradient(),
          filter: `drop-shadow(0 0 20px rgba(${colors.primary}, 0.8))`,
        }}
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
              className="group relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border rounded-2xl p-6 transition-all duration-300 will-change-transform cursor-pointer"
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(0)",
                ...getBorderStyle(0.1),
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
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 0), rgba(${colors.secondary}, 0.1), rgba(${colors.primary}, 0.1))`,
                }}
              />
              
              {/* Corner accent */}
              <div 
                className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(${colors.accent}, 0.2), transparent)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div 
                    className="w-2 h-2 rounded-full group-hover:animate-pulse"
                    style={{ backgroundColor: `rgba(${colors.accent}, 1)` }}
                  />
                  <h3 
                    className="text-xl font-bold leading-normal transition-all duration-300"
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(${colors.accent}, 0.9), rgba(${colors.secondary}, 1), rgba(${colors.primary}, 0.9))`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
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
                        className="group/item relative flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border transition-all duration-300 cursor-pointer"
                        style={{
                          borderColor: `rgba(${colors.accent}, 0.1)`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.5)`;
                          e.currentTarget.style.backgroundColor = `rgba(${colors.accent}, 0.1)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.1)`;
                          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                        }}
                      >
                        {/* Icon glow on hover */}
                        <div 
                          className="absolute inset-0 rounded-xl blur-sm transition-all duration-300 opacity-0 group-hover/item:opacity-100"
                          style={{ backgroundColor: `rgba(${colors.accent}, 0.05)` }}
                        />
                        
                        <Icon 
                          size={32} 
                          className="transition-colors duration-300 relative z-10" 
                          style={{ 
                            color: `rgba(${colors.accent}, 0.9)`,
                            filter: `drop-shadow(0 0 8px rgba(${colors.accent}, 0.6))`,
                          }}
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
