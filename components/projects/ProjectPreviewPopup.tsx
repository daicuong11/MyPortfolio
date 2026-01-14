"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minimize2, Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { useThemeColors } from "@/hooks/useThemeColors";
import { videoCache } from "@/lib/videoCache";

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
  const { colors } = useThemeColors();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use cached video when popup opens for instant playback
  useEffect(() => {
    if (isOpen && videoRef.current) {
      const video = videoRef.current;
      
      // Check if video is already cached and ready
      const cachedVideo = videoCache.get(videoUrl);
      
      if (cachedVideo && videoCache.isReady(videoUrl)) {
        // Video is already preloaded! Use it directly
        setIsLoading(false);
        
        // Clone the cached video state to our ref
        // The video element should already be loaded
        const playVideo = () => {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                console.log("Autoplay prevented:", error.name);
                setIsPlaying(false);
              });
          }
        };
        
        // If video is already ready, play immediately
        if (video.readyState >= 3) {
          playVideo();
        } else {
          // Wait for ready state
          const handleCanPlay = () => {
            setIsLoading(false);
            playVideo();
            video.removeEventListener('canplaythrough', handleCanPlay);
          };
          video.addEventListener('canplaythrough', handleCanPlay);
        }
      } else {
        // Fallback: load video normally if not cached
        setIsLoading(true);
        video.load();
        
        const handleCanPlay = () => {
          setIsLoading(false);
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                console.log("Autoplay prevented:", error.name);
                setIsPlaying(false);
              });
          }
        };
        
        video.addEventListener('canplaythrough', handleCanPlay);
        
        return () => {
          video.removeEventListener('canplaythrough', handleCanPlay);
        };
      }
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsLoading(true);
    }
  }, [isOpen, videoUrl]);

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
            onClick={onClose}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md cursor-pointer"
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
              onClick={(e) => e.stopPropagation()}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000
              }}
              className="relative w-full max-w-6xl aspect-video pointer-events-auto"
            >
              {/* Dynamic Glow effect around popup - optimized blur */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="absolute -inset-6 rounded-3xl blur-xl md:blur-2xl"
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(${colors.primary}, 0.3), rgba(${colors.secondary}, 0.3), rgba(${colors.primary}, 0.3))`,
                  willChange: 'transform, opacity',
                }}
              />
              
              {/* Pulsing outer glow - disabled on mobile for performance */}
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
                className="hidden md:block absolute -inset-8 rounded-3xl blur-xl md:blur-2xl"
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(${colors.accent}, 0.2), rgba(${colors.secondary}, 0.2), rgba(${colors.accent}, 0.2))`,
                  willChange: 'transform, opacity',
                }}
              />

              {/* Main popup content */}
              <motion.div 
                initial={{ borderColor: `rgba(${colors.accent}, 0.1)` }}
                animate={{ borderColor: `rgba(${colors.accent}, 0.4)` }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-black/90 border-2"
                style={{ 
                  borderColor: `rgba(${colors.accent}, 0.4)`,
                  boxShadow: `0 0 80px rgba(${colors.accent}, 0.6)`,
                }}
              >
                {/* Header */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-2 sm:p-4 bg-gradient-to-b from-black/90 to-transparent"
                >
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-sm sm:text-base md:text-xl font-bold truncate pr-2"
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(${colors.accent}, 1), rgba(${colors.secondary}, 1))`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
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
                    className="group relative flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 border transition-all duration-300 cursor-pointer flex-shrink-0"
                    style={{ borderColor: `rgba(${colors.accent}, 0.2)` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `rgba(${colors.accent}, 0.2)`;
                      e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.4)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.2)`;
                    }}
                    aria-label="Close preview"
                  >
                    <Minimize2
                      size={14}
                      className="sm:w-4 sm:h-4 group-hover:brightness-110 transition-all"
                      style={{ color: `rgba(${colors.accent}, 0.9)` }}
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
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                    }}
                  />
                  
                  {/* Gradient overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
                </motion.div>

                {/* Video Controls & Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 z-20 p-2 sm:p-4 md:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent"
                >
                  <div className="flex items-center justify-between max-w-4xl mx-auto">
                    {/* Video controls */}
                    <div className="flex items-center gap-1 sm:gap-2">
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
                              const playPromise = videoRef.current.play();
                              if (playPromise !== undefined) {
                                playPromise
                                  .then(() => {
                                    setIsPlaying(true);
                                  })
                                  .catch((error) => {
                                    console.log("Play prevented:", error.name);
                                    setIsPlaying(false);
                                  });
                              }
                            }
                          }
                        }}
                        className="group relative w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer"
                        style={{
                          backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 0.2), rgba(${colors.secondary}, 0.2))`,
                          borderColor: `rgba(${colors.accent}, 0.3)`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.6)`;
                          e.currentTarget.style.backgroundImage = `linear-gradient(135deg, rgba(${colors.primary}, 0.3), rgba(${colors.secondary}, 0.3))`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.3)`;
                          e.currentTarget.style.backgroundImage = `linear-gradient(135deg, rgba(${colors.primary}, 0.2), rgba(${colors.secondary}, 0.2))`;
                        }}
                      >
                        {isPlaying ? (
                          <Pause className="w-3 h-3 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" style={{ color: `rgba(${colors.accent}, 0.9)` }} />
                        ) : (
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] ml-0.5" style={{ color: `rgba(${colors.accent}, 0.9)` }} />
                        )}
                        <div 
                          className="absolute inset-0 rounded-full blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                          style={{ backgroundColor: `rgba(${colors.accent}, 0.1)` }}
                        />
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
                        className="group relative w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer"
                        style={{
                          backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 0.2), rgba(${colors.secondary}, 0.2))`,
                          borderColor: `rgba(${colors.accent}, 0.3)`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.6)`;
                          e.currentTarget.style.backgroundImage = `linear-gradient(135deg, rgba(${colors.primary}, 0.3), rgba(${colors.secondary}, 0.3))`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.3)`;
                          e.currentTarget.style.backgroundImage = `linear-gradient(135deg, rgba(${colors.primary}, 0.2), rgba(${colors.secondary}, 0.2))`;
                        }}
                      >
                        {isMuted ? (
                          <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" style={{ color: `rgba(${colors.accent}, 0.9)` }} />
                        ) : (
                          <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" style={{ color: `rgba(${colors.accent}, 0.9)` }} />
                        )}
                        <div 
                          className="absolute inset-0 rounded-full blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                          style={{ backgroundColor: `rgba(${colors.accent}, 0.1)` }}
                        />
                      </motion.button>

                      {/* Restart */}
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: -180 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            const playPromise = videoRef.current.play();
                            if (playPromise !== undefined) {
                              playPromise
                                .then(() => {
                                  setIsPlaying(true);
                                })
                                .catch((error) => {
                                  console.log("Restart play prevented:", error.name);
                                  setIsPlaying(false);
                                });
                            }
                          }
                        }}
                        className="group relative w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer"
                        style={{
                          backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 0.2), rgba(${colors.secondary}, 0.2))`,
                          borderColor: `rgba(${colors.accent}, 0.3)`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.6)`;
                          e.currentTarget.style.backgroundImage = `linear-gradient(135deg, rgba(${colors.primary}, 0.3), rgba(${colors.secondary}, 0.3))`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.3)`;
                          e.currentTarget.style.backgroundImage = `linear-gradient(135deg, rgba(${colors.primary}, 0.2), rgba(${colors.secondary}, 0.2))`;
                        }}
                      >
                        <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" style={{ color: `rgba(${colors.accent}, 0.9)` }} />
                        <div 
                          className="absolute inset-0 rounded-full blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                          style={{ backgroundColor: `rgba(${colors.accent}, 0.1)` }}
                        />
                      </motion.button>
                    </div>

                    {/* Esc hint - Hidden on mobile */}
                    <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
                      <kbd 
                        className="px-2 py-1 rounded-lg bg-white/10 border text-[10px] font-mono font-medium"
                        style={{ 
                          borderColor: `rgba(${colors.accent}, 0.2)`,
                          color: `rgba(${colors.accent}, 0.9)`,
                        }}
                      >
                        Esc
                      </kbd>
                      <span>
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
                      <div 
                        className="w-12 h-12 border-4 rounded-full animate-spin"
                        style={{
                          borderColor: `rgba(${colors.accent}, 0.3)`,
                          borderTopColor: `rgba(${colors.accent}, 1)`,
                        }}
                      />
                      <span className="text-sm font-medium" style={{ color: `rgba(${colors.accent}, 0.9)` }}>
                        {t.projects.loadingVideo}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Corner glow effects - optimized blur, hidden on mobile */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="hidden md:block absolute top-0 left-0 w-40 h-40 bg-cyan-500/30 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" 
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="hidden md:block absolute top-0 right-0 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" 
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="hidden md:block absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/30 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" 
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="hidden md:block absolute bottom-0 right-0 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" 
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
