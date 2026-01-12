"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Tăng stiffness và giảm damping để phản ứng nhanh hơn, ít delay hơn
  const springConfig = { damping: 20, stiffness: 1200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Find hero section
    heroRef.current = document.querySelector(".hero-cursor-area");

    const handleMouseMove = (e: MouseEvent) => {
      // Update position ngay lập tức với spring animation mượt mà
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Check if mouse is over hero section
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const isInHero = 
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        
        setIsVisible(isInHero);
        
        // Check if hovering over interactive elements
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

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor - Outer glow ring with crosshair */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
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
              borderColor: "#00f5ff",
              boxShadow: `
                0 0 25px rgba(0, 245, 255, 0.8),
                0 0 50px rgba(0, 245, 255, 0.5),
                0 0 75px rgba(0, 245, 255, 0.3),
                inset 0 0 25px rgba(0, 245, 255, 0.3)
              `,
            }}
            animate={{
              boxShadow: [
                `0 0 25px rgba(0, 245, 255, 0.8), 0 0 50px rgba(0, 245, 255, 0.5), 0 0 75px rgba(0, 245, 255, 0.3), inset 0 0 25px rgba(0, 245, 255, 0.3)`,
                `0 0 35px rgba(0, 245, 255, 1), 0 0 70px rgba(0, 245, 255, 0.7), 0 0 100px rgba(0, 245, 255, 0.4), inset 0 0 30px rgba(0, 245, 255, 0.4)`,
                `0 0 25px rgba(0, 245, 255, 0.8), 0 0 50px rgba(0, 245, 255, 0.5), 0 0 75px rgba(0, 245, 255, 0.3), inset 0 0 25px rgba(0, 245, 255, 0.3)`,
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
              backgroundColor: "#00f5ff",
              boxShadow: "0 0 15px rgba(0, 245, 255, 1), 0 0 30px rgba(0, 245, 255, 0.6)",
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
              background: "linear-gradient(90deg, transparent, #00f5ff, transparent)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 10px rgba(0, 245, 255, 0.9)",
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
              background: "linear-gradient(180deg, transparent, #00f5ff, transparent)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 10px rgba(0, 245, 255, 0.9)",
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
              className="absolute w-1.5 h-1.5 bg-cyan-400"
              style={{
                ...pos,
                boxShadow: "0 0 8px rgba(0, 245, 255, 0.8)",
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
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
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
                backgroundColor: "#00f5ff",
                boxShadow: `0 0 ${6 + i * 3}px rgba(0, 245, 255, 0.8)`,
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
          className="pointer-events-none fixed top-0 left-0 z-[9997]"
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
                borderColor: "#00f5ff",
                boxShadow: "0 0 30px rgba(0, 245, 255, 0.6)",
              }}
            />
          </div>
        </motion.div>
      )}
    </>
  );
}
