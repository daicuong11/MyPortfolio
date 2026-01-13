"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Download, Eye } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations, getLocaleFromPath } from "@/lib/i18n";
import { getFileUrl } from "@/lib/paths";

export default function ContactSection() {
  const pathname = usePathname();
  const t = useTranslations();
  const locale = getLocaleFromPath(pathname);

  const cvFileName = locale === "vi"
    ? "cv/LyDaiCuong_CV_Vi.pdf"
    : "cv/LyDaiCuong_CV_En.pdf";
  const cvFile = getFileUrl(cvFileName);

  return (
    <section className="relative py-40 px-6 bg-black overflow-hidden">
      {/* cinematic lights */}
      <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[160px]" />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 leading-normal bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          {t.contact.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10"
        >
          <div className="space-y-6 text-left">
            <ContactItem
              icon={<Mail />}
              label={t.contact.email.label}
              value={t.contact.email.value}
              link={t.contact.email.link}
            />
            <ContactItem
              icon={<Github />}
              label={t.contact.github.label}
              value={t.contact.github.value}
              link={t.contact.github.link}
            />
            <ContactItem
              icon={<Linkedin />}
              label={t.contact.linkedin.label}
              value={t.contact.linkedin.value}
              link={t.contact.linkedin.link}
            />

            {/* CV Preview */}
            <ContactItem
              icon={<Eye />}
              label={t.contact.previewCV.label}
              value={t.contact.previewCV.value}
              link={cvFile}
            />

            {/* CV Download */}
            <a
              href={cvFile}
              download
              className="flex items-center gap-4 p-4 rounded-xl bg-cyan-500/20 border border-cyan-400/30 hover:bg-cyan-500/30 transition"
            >
              <div className="text-cyan-400">
                <Download />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t.contact.downloadCV.label}</p>
                <p className="text-white font-medium">
                  {t.contact.downloadCV.value}
                </p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition"
    >
      <div className="text-cyan-400">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </a>
  );
}
