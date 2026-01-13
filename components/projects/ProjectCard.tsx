"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaGlobe } from "react-icons/fa";
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

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isHoveringThumbnail, setIsHoveringThumbnail] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringPopupRef = useRef(false);
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
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
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
    
    // Only close if not hovering popup
    if (!isHoveringPopupRef.current) {
      closeTimeoutRef.current = setTimeout(() => {
        // Final check before closing
        if (!isHoveringPopupRef.current) {
          setIsPreviewOpen(false);
        }
      }, 600); // Reduced to 600ms for better responsiveness
    }
  }, [clearAllTimeouts]);

  const handlePopupEnter = useCallback(() => {
    isHoveringPopupRef.current = true;
    clearAllTimeouts();
  }, [clearAllTimeouts]);

  const handleClose = useCallback(() => {
    setIsPreviewOpen(false);
    setIsHoveringThumbnail(false);
    setIsLoading(false);
    setProgress(0);
    isHoveringPopupRef.current = false;
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
        whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="group relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-cyan-400/40 hover:shadow-cyan-500/20 transform-gpu"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Background image */}
        <div
          className="relative h-48 overflow-hidden cursor-pointer rounded-t-2xl"
          onMouseEnter={handleThumbnailEnter}
          onMouseLeave={handleThumbnailLeave}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover scale-105 group-hover:scale-125 transition duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          {/* Hover indicator with progress bar */}
          {project.video && (
            <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${isHoveringThumbnail || isPreviewOpen ? 'opacity-100' : 'opacity-0'}`}>
              {isLoading ? (
                <CircularProgress progress={progress} size={40} strokeWidth={2.5} />
              ) : (
                <div className="text-cyan-400 text-sm font-semibold backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-cyan-400/30">
                  Preview
                </div>
              )}
            </div>
          )}
        </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold leading-normal bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-gray-300 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
            >
              <FaGlobe /> {project.demoLabel || "Demo"}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full bg-white/10 text-white border border-white/20 hover:border-cyan-400/40 transition"
            >
              <FaGithub /> {project.codeLabel || "Code"}
            </a>
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
          onMouseEnter={handlePopupEnter}
        />
      )}
    </motion.div>
    </>
  );
}
