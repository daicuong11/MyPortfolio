"use client";

import { useEffect, useState, useRef, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useThemeColors } from "@/hooks/useThemeColors";

function CustomCursor() {
  const { colors } = useThemeColors();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 800, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    heroRef.current = document.querySelector(".hero-cursor-area");

    const handleMouseMove = (e: MouseEvent) => {
      // Skip update when scrolling for performance
      if (isScrolling) return;
      
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const isInHero = 
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        
        setIsVisible(isInHero);
        
        const target = e.target;
        if (target && target instanceof HTMLElement) {
          const isInteractive = Boolean(
            target.tagName === "BUTTON" ||
            target.tagName === "A" ||
            target.closest("button") ||
            target.closest("a")
          );
          setIsHovering(isInteractive);
        }
      }
    };

    const handleScroll = () => {
      setIsScrolling(true);
      setIsVisible(false);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (target && target instanceof HTMLElement && target.closest(".hero-cursor-area")) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      if (target && target instanceof HTMLElement && !target.closest(".hero-cursor-area")) {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [cursorX, cursorY, isScrolling]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor - Outer glow ring with crosshair */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100000]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Outer ring with animated glow */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{
              width: "48px",
              height: "48px",
              borderColor: `rgb(${colors.accent})`,
              boxShadow: `
                0 0 25px rgba(${colors.accent}, 0.8),
                0 0 50px rgba(${colors.accent}, 0.5),
                0 0 75px rgba(${colors.accent}, 0.3),
                inset 0 0 25px rgba(${colors.accent}, 0.3)
              `,
            }}
            animate={{
              boxShadow: [
                `0 0 25px rgba(${colors.accent}, 0.8), 0 0 50px rgba(${colors.accent}, 0.5), 0 0 75px rgba(${colors.accent}, 0.3), inset 0 0 25px rgba(${colors.accent}, 0.3)`,
                `0 0 35px rgba(${colors.accent}, 1), 0 0 70px rgba(${colors.accent}, 0.7), 0 0 100px rgba(${colors.accent}, 0.4), inset 0 0 30px rgba(${colors.accent}, 0.4)`,
                `0 0 25px rgba(${colors.accent}, 0.8), 0 0 50px rgba(${colors.accent}, 0.5), 0 0 75px rgba(${colors.accent}, 0.3), inset 0 0 25px rgba(${colors.accent}, 0.3)`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Inner pulsing dot */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "4px",
              height: "4px",
              backgroundColor: `rgb(${colors.accent})`,
              boxShadow: `0 0 15px rgba(${colors.accent}, 1), 0 0 30px rgba(${colors.accent}, 0.6)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Crosshair lines - horizontal */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "16px",
              height: "1.5px",
              background: `linear-gradient(90deg, transparent, rgb(${colors.accent}), transparent)`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: `0 0 10px rgba(${colors.accent}, 0.9)`,
            }}
            animate={{
              width: isHovering ? "24px" : "16px",
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Crosshair lines - vertical */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "1.5px",
              height: "16px",
              background: `linear-gradient(180deg, transparent, rgb(${colors.accent}), transparent)`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: `0 0 10px rgba(${colors.accent}, 0.9)`,
            }}
            animate={{
              height: isHovering ? "24px" : "16px",
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Corner indicators */}
          {[
            { top: "0", left: "0" },
            { top: "0", right: "0" },
            { bottom: "0", left: "0" },
            { bottom: "0", right: "0" },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5"
              style={{
                ...pos,
                backgroundColor: `rgb(${colors.accent})`,
                boxShadow: `0 0 8px rgba(${colors.accent}, 0.8)`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Particle trail effect */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: `${3 + i * 1.5}px`,
                height: `${3 + i * 1.5}px`,
                backgroundColor: `rgb(${colors.accent})`,
                boxShadow: `0 0 ${6 + i * 3}px rgba(${colors.accent}, 0.8)`,
                left: `${Math.cos((i * Math.PI * 2) / 4) * 20}px`,
                top: `${Math.sin((i * Math.PI * 2) / 4) * 20}px`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.8, 0],
                left: [
                  `${Math.cos((i * Math.PI * 2) / 4) * 20}px`,
                  `${Math.cos((i * Math.PI * 2) / 4) * 35}px`,
                  `${Math.cos((i * Math.PI * 2) / 4) * 20}px`,
                ],
                top: [
                  `${Math.sin((i * Math.PI * 2) / 4) * 20}px`,
                  `${Math.sin((i * Math.PI * 2) / 4) * 35}px`,
                  `${Math.sin((i * Math.PI * 2) / 4) * 20}px`,
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Hover effect - expanding ring */}
      {isHovering && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[99998]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{
            scale: [0, 2, 2.5],
            opacity: [0.8, 0.4, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: "60px",
                height: "60px",
                borderColor: `rgb(${colors.accent})`,
                boxShadow: `0 0 30px rgba(${colors.accent}, 0.6)`,
              }}
            />
          </div>
        </motion.div>
      )}
    </>
  );
}

export default memo(CustomCursor);
