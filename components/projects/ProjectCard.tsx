"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { Eye } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import ProjectPreviewPopup from "./ProjectPreviewPopup";
import CircularProgress from "./CircularProgress";

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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isHoveringThumbnail, setIsHoveringThumbnail] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoPreloadRef = useRef<HTMLVideoElement | null>(null);
  const isOpeningRef = useRef(false); // Prevent multiple opens

  // Preload video when component mounts
  useEffect(() => {
    if (project.video) {
      const video = document.createElement("video");
      video.src = project.video;
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;
      video.load();
      videoPreloadRef.current = video;
    }
    return () => {
      if (videoPreloadRef.current) {
        videoPreloadRef.current = null;
      }
    };
  }, [project.video]);

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

  const handleThumbnailEnter = useCallback(() => {
    // Prevent multiple opens
    if (!project.video || isOpeningRef.current || isPreviewOpen) {
      return;
    }

    setIsHoveringThumbnail(true);
    setIsLoading(true);
    setProgress(0);
    isOpeningRef.current = true;
    
    // Clear any existing timeouts
    clearAllTimeouts();

    // Start progress bar animation (optimized with RAF)
    const duration = 1200; // 1.2 seconds
    const startTime = Date.now();
      
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);
      
      if (newProgress < 100) {
        progressIntervalRef.current = setTimeout(() => {
          animate();
        }, 16) as any; // ~60fps
      } else {
        // Open preview when progress completes
        setIsPreviewOpen(true);
        setIsLoading(false);
        isOpeningRef.current = false;
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
        className="group relative rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-cyan-400/60 hover:shadow-[0_20px_60px_rgba(6,182,212,0.3)] transition-all duration-300"
        style={{ transformStyle: "preserve-3d", willChange: "transform", transform: "translateZ(0)" }}
      >
        {/* Animated gradient overlay on card */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-500 rounded-2xl" />
        
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
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-500" />
          
          {/* Animated scan line effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
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
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
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
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-cyan-300 text-xs font-medium"
                  >
                    {t.projects.loadingPreview}
                  </motion.span>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-2 backdrop-blur-md bg-gradient-to-br from-cyan-500/20 to-purple-500/20 px-6 py-3 rounded-2xl border border-cyan-400/50 shadow-lg"
                >
                  <Eye size={24} className="text-cyan-300" />
                  <span className="text-cyan-300 text-sm font-semibold">
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
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 group-hover:animate-pulse" />
          <h3 className="text-xl font-bold leading-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:to-purple-300 transition-all duration-300">
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
              className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400/10 to-blue-400/10 text-cyan-300 border border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-400/20 transition-all duration-200 font-medium cursor-default"
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
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 cursor-pointer"
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
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-white/10 text-white border border-white/20 hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all duration-300 font-medium cursor-pointer"
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
