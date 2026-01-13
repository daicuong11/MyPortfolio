"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n";

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
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition will-change-transform"
            >
              <h3 className="text-xl font-semibold mb-4 leading-normal bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                {group.title}
                </h3>

              <div className="grid grid-cols-3 gap-4">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      key={item.name}
                      className="flex flex-col items-center text-sm text-gray-300"
                    >
                      <Icon size={28} className="text-cyan-300 mb-1" />
                      {item.name}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(SkillsSection);
