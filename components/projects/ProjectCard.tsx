"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { Eye } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import ProjectPreviewPopup from "./ProjectPreviewPopup";
import CircularProgress from "./CircularProgress";
import { useThemeColors } from "@/hooks/useThemeColors";
import { videoCache } from "@/lib/videoCache";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    image: string;
    video?: string;
    demo?: string;
    github?: string;
    demoLabel?: string;
    codeLabel?: string;
  };
}

function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations();
  const { colors } = useThemeColors();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isHoveringThumbnail, setIsHoveringThumbnail] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isOpeningRef = useRef(false); // Prevent multiple opens
  const preloadStartTimeRef = useRef<number>(0);

  const clearAllTimeouts = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
      }
  }, []);

  const handleThumbnailEnter = useCallback(async () => {
    // Prevent multiple opens
    if (!project.video || isOpeningRef.current || isPreviewOpen) {
      return;
    }

      setIsHoveringThumbnail(true);
      setIsLoading(true);
      setProgress(0);
    setVideoReady(false);
    isOpeningRef.current = true;
    preloadStartTimeRef.current = Date.now();
      
      // Clear any existing timeouts
    clearAllTimeouts();

    // Start video preloading in parallel
    const videoPromise = videoCache.preload(project.video).then(() => {
      setVideoReady(true);
    }).catch((error) => {
      console.error("Failed to preload video:", error);
      // Continue anyway, let the popup handle it
      setVideoReady(true);
    });

    // Minimum loading duration: 1.4 seconds for better UX
    const MINIMUM_DURATION = 1400; // 1.4 seconds
    const startTime = Date.now();
      
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / MINIMUM_DURATION) * 100, 100);
      
      setProgress(newProgress);
      
      if (newProgress < 100) {
        progressIntervalRef.current = setTimeout(() => {
          animate();
        }, 16) as any; // ~60fps
      } else {
        // Wait for both progress bar AND video to be ready
        videoPromise.then(() => {
          // Ensure minimum time has passed
          const totalElapsed = Date.now() - preloadStartTimeRef.current;
          const remainingTime = Math.max(0, MINIMUM_DURATION - totalElapsed);
          
          setTimeout(() => {
            // Only open if still hovering/loading
            if (isOpeningRef.current) {
            setIsPreviewOpen(true);
            setIsLoading(false);
              isOpeningRef.current = false;
          }
          }, remainingTime);
        });
    }
  };

    animate();
  }, [project.video, isPreviewOpen, clearAllTimeouts]);

  const handleThumbnailLeave = useCallback(() => {
    setIsHoveringThumbnail(false);
    setIsLoading(false);
    setProgress(0);
    isOpeningRef.current = false;
    
    // Clear all timeouts
    clearAllTimeouts();
    
    // DO NOT close popup on hover leave
    // Popup will only close via Esc key or close button
  }, [clearAllTimeouts]);

  const handleClose = useCallback(() => {
    setIsPreviewOpen(false);
    setIsHoveringThumbnail(false);
    setIsLoading(false);
    setProgress(0);
    isOpeningRef.current = false;
    clearAllTimeouts();
  }, [clearAllTimeouts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  return (
    <>
      <motion.div
        whileHover={{ y: -12, rotateX: 3, rotateY: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border transition-all duration-300"
        style={{ 
          transformStyle: "preserve-3d", 
          willChange: "transform", 
          transform: "translateZ(0)",
          borderColor: `rgba(${colors.accent}, 0.1)`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.6)`;
          e.currentTarget.style.boxShadow = `0 20px 60px rgba(${colors.primary}, 0.3)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.1)`;
          e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4)`;
        }}
      >
        {/* Animated gradient overlay on card */}
        <div 
          className="absolute inset-0 transition-all duration-500 rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 0), rgba(${colors.secondary}, 0.05), rgba(${colors.primary}, 0.05))`,
          }}
        />
        
        {/* Background image with enhanced effects */}
        <div
          className="relative h-56 overflow-hidden cursor-pointer"
          onMouseEnter={handleThumbnailEnter}
          onMouseLeave={handleThumbnailLeave}
        >
          {/* Image with zoom and blur effect */}
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Multi-layer gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          <div 
            className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 0), rgba(${colors.secondary}, 0.2))`,
            }}
          />
          
          {/* Animated scan line effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(180deg, transparent, rgba(${colors.accent}, 0.3), transparent)`,
            }}
            initial={{ y: "-100%" }}
            animate={{ y: "200%" }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 2
            }}
          />
          
          {/* Corner accent */}
          <div 
            className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(${colors.accent}, 0.3), transparent)`,
            }}
          />
          
          {/* Cached video indicator badge */}
          {project.video && videoCache.isReady(project.video) && !isHoveringThumbnail && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-medium"
              style={{
                backgroundColor: `rgba(${colors.primary}, 0.2)`,
                borderColor: `rgba(${colors.accent}, 0.5)`,
                color: `rgba(${colors.accent}, 0.9)`,
              }}
            >
              <div 
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: `rgba(${colors.accent}, 1)` }}
              />
              Ready
            </motion.div>
          )}
          
          {/* Hover indicator with progress bar */}
          {project.video && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isHoveringThumbnail || isPreviewOpen ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              {isLoading ? (
                <div className="flex flex-col items-center gap-3">
                  <CircularProgress progress={progress} size={50} strokeWidth={3} />
                  <div className="flex flex-col items-center gap-1">
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-medium"
                      style={{ color: `rgba(${colors.accent}, 0.9)` }}
                    >
                      {videoReady ? t.projects.loadingPreview : t.projects.loadingVideo || "Loading video..."}
                    </motion.span>
                    {videoReady && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-gray-400"
                      >
                        Video ready ✓
                      </motion.span>
                    )}
                  </div>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-2 backdrop-blur-md px-6 py-3 rounded-2xl border shadow-lg"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(${colors.primary}, 0.2), rgba(${colors.secondary}, 0.2))`,
                    borderColor: `rgba(${colors.accent}, 0.5)`,
                  }}
                >
                  <Eye size={24} style={{ color: `rgba(${colors.accent}, 0.9)` }} />
                  <span className="text-sm font-semibold" style={{ color: `rgba(${colors.accent}, 0.9)` }}>
                    {t.projects.previewProject}
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

      {/* Content with enhanced styling */}
      <div className="relative p-6 z-10">
        {/* Status badge */}
        <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-[10px] font-medium">
          {t.projects.status.active}
        </div>
        
        <div className="flex items-start gap-2 mb-3">
          <div 
            className="w-1.5 h-1.5 rounded-full mt-2 group-hover:animate-pulse" 
            style={{ backgroundColor: `rgba(${colors.accent}, 1)` }}
          />
          <h3 
            className="text-xl font-bold leading-tight transition-all duration-300"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(${colors.accent}, 0.9), rgba(${colors.secondary}, 1), rgba(${colors.primary}, 0.9))`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
          {project.title}
        </h3>
        </div>

        <p className="text-sm text-gray-400 group-hover:text-gray-300 mb-5 leading-relaxed transition-colors">
          {project.description}
        </p>

        {/* Tech stack with improved design */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t, i) => (
            <motion.span 
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 font-medium cursor-default"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(${colors.accent}, 0.1), rgba(${colors.secondary}, 0.1))`,
                color: `rgba(${colors.accent}, 0.9)`,
                borderColor: `rgba(${colors.accent}, 0.3)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.6)`;
                e.currentTarget.style.backgroundColor = `rgba(${colors.accent}, 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.3)`;
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Action buttons with better styling */}
        <div className="flex gap-3">
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl text-white font-semibold transition-all duration-300 shadow-lg cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(${colors.primary}, 1), rgba(${colors.secondary}, 1))`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(${colors.primary}, 0.5)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";
              }}
            >
              <FaGlobe size={14} /> 
              {project.demoLabel || "Demo"}
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-white/10 text-white border transition-all duration-300 font-medium cursor-pointer"
              style={{
                borderColor: `rgba(${colors.accent}, 0.2)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.6)`;
                e.currentTarget.style.backgroundColor = `rgba(${colors.accent}, 0.1)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${colors.accent}, 0.2)`;
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
            >
              <FaGithub size={14} /> 
              {project.codeLabel || "Code"}
            </motion.a>
          )}
        </div>
      </div>
      
      {/* Preview Popup */}
      {project.video && (
        <ProjectPreviewPopup
          isOpen={isPreviewOpen}
          onClose={handleClose}
          videoUrl={project.video}
          title={project.title}
        />
      )}
    </motion.div>
    </>
  );
}

export default memo(ProjectCard);
