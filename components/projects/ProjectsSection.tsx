"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useTranslations } from "@/lib/i18n";

function ProjectsSection() {
  const t = useTranslations();

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-[#050a1a] to-black overflow-hidden">
        {/* cinematic light blobs */}
        <div className="absolute -top-40 left-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[160px] -translate-x-1/2" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[160px]" />

        <div className="relative max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-20 leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.8)]"
        >
          {t.projects.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 overflow-visible">
          {t.projects.items.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
            >
              <ProjectCard 
                project={{
                  ...p,
                  demoLabel: t.projects.buttons.demo,
                  codeLabel: t.projects.buttons.code,
                }} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ProjectsSection);
