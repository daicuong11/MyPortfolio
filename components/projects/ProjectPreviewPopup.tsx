"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minimize2 } from "lucide-react";
import { useTranslations } from "@/lib/i18n";

interface ProjectPreviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export default function ProjectPreviewPopup({
  isOpen,
  onClose,
  videoUrl,
  title,
}: ProjectPreviewPopupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play might fail, that's okay
      });
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const popupContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md"
          />

          {/* Popup Container */}
          <div 
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              ref={popupRef}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.4,
              }}
              className="relative w-full max-w-6xl aspect-video pointer-events-auto"
            >
              {/* Glow effect around popup */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50" />

              {/* Main popup content */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-black/80 border-2 border-cyan-400/30 shadow-[0_0_60px_rgba(0,245,255,0.5)]">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {title}
                  </h3>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 hover:bg-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer"
                    aria-label="Close preview"
                  >
                    <Minimize2
                      size={14}
                      className="text-cyan-300 group-hover:text-cyan-400 transition-colors"
                    />
                    <div className="absolute inset-0 rounded-full bg-cyan-400/20 scale-0 group-hover:scale-150 transition-transform duration-300 blur-md" />
                  </button>
                </div>

                {/* Video container */}
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                  />
                  
                  {/* Gradient overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
                </div>

                {/* Footer tip */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent"
                >
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 text-xs font-mono">
                      Esc
                    </kbd>
                    <span>
                      {t.projects.previewTip || "Press Esc to exit"}
                    </span>
                  </div>
                </motion.div>

                {/* Corner glow effects */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(popupContent, document.body);
}
