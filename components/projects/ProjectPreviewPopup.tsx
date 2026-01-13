"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minimize2, Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Preload video when popup opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      setIsLoading(true);
      const video = videoRef.current;
      
      video.load();
      
      const handleCanPlay = () => {
        setIsLoading(false);
        video.play().catch(() => {
          setIsPlaying(false);
        });
      };
      
      video.addEventListener('canplaythrough', handleCanPlay);
      
      return () => {
        video.removeEventListener('canplaythrough', handleCanPlay);
      };
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsLoading(true);
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
              initial={{ 
                scale: 0.3, 
                opacity: 0, 
                y: 200,
                rotateX: 45,
                filter: "blur(20px)"
              }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                rotateX: 0,
                filter: "blur(0px)"
              }}
              exit={{ 
                scale: 0.5, 
                opacity: 0, 
                y: 100,
                rotateX: -20,
                filter: "blur(10px)"
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 400,
                mass: 0.8,
                opacity: { duration: 0.3 },
                filter: { duration: 0.3 }
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000
              }}
              className="relative w-full max-w-6xl aspect-video pointer-events-auto"
            >
              {/* Dynamic Glow effect around popup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="absolute -inset-6 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl blur-3xl"
              />
              
              {/* Pulsing outer glow */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-8 bg-gradient-to-r from-cyan-400/20 via-purple-600/20 to-cyan-400/20 rounded-3xl blur-3xl"
              />

              {/* Main popup content */}
              <motion.div 
                initial={{ borderColor: "rgba(0, 245, 255, 0.1)" }}
                animate={{ borderColor: "rgba(0, 245, 255, 0.4)" }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-black/90 border-2 shadow-[0_0_80px_rgba(0,245,255,0.6)]"
                style={{ borderColor: "rgba(0, 245, 255, 0.4)" }}
              >
                {/* Header */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/90 to-transparent"
                >
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                  >
                    {title}
                  </motion.h3>

                  {/* Close button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.4, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer"
                    aria-label="Close preview"
                  >
                    <Minimize2
                      size={16}
                      className="text-cyan-300 group-hover:text-cyan-400 transition-colors"
                    />
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 2 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </motion.div>

                {/* Video container */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <motion.video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    preload="auto"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  
                  {/* Gradient overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
                </motion.div>

                {/* Video Controls & Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent"
                >
                  <div className="flex items-center justify-between max-w-4xl mx-auto">
                    {/* Video controls */}
                    <div className="flex items-center gap-2">
                      {/* Play/Pause */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (videoRef.current) {
                            if (isPlaying) {
                              videoRef.current.pause();
                              setIsPlaying(false);
                            } else {
                              videoRef.current.play();
                              setIsPlaying(true);
                            }
                          }
                        }}
                        className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 hover:border-cyan-400/60 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer"
                      >
                        {isPlaying ? (
                          <Pause size={18} className="text-cyan-300" />
                        ) : (
                          <Play size={18} className="text-cyan-300 ml-0.5" />
                        )}
                        <div className="absolute inset-0 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/10 blur-sm transition-all duration-300" />
                      </motion.button>

                      {/* Mute/Unmute */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.muted = !isMuted;
                            setIsMuted(!isMuted);
                          }
                        }}
                        className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 hover:border-cyan-400/60 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer"
                      >
                        {isMuted ? (
                          <VolumeX size={18} className="text-cyan-300" />
                        ) : (
                          <Volume2 size={18} className="text-cyan-300" />
                        )}
                        <div className="absolute inset-0 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/10 blur-sm transition-all duration-300" />
                      </motion.button>

                      {/* Restart */}
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: -180 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play();
                            setIsPlaying(true);
                          }
                        }}
                        className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 hover:border-cyan-400/60 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer"
                      >
                        <RotateCcw size={16} className="text-cyan-300" />
                        <div className="absolute inset-0 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/10 blur-sm transition-all duration-300" />
                      </motion.button>
                    </div>

                    {/* Esc hint */}
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <kbd className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-[10px] font-mono font-medium text-cyan-300">
                        Esc
                      </kbd>
                      <span className="hidden sm:inline">
                        {t.projects.previewTip || "Press to exit"}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Loading overlay */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                      <span className="text-cyan-300 text-sm font-medium">
                        {t.projects.loadingVideo}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Corner glow effects */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="absolute top-0 left-0 w-40 h-40 bg-cyan-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" 
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="absolute top-0 right-0 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" 
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" 
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" 
                />
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(popupContent, document.body);
}
