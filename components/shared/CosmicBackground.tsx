"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeColors } from "@/hooks/useThemeColors";

interface CosmicBackgroundProps {
  intensity?: "light" | "medium" | "strong";
}

export default function CosmicBackground({ 
  intensity = "medium" 
}: CosmicBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const { colors: themeColors } = useThemeColors();

  useEffect(() => {
    setMounted(true);
  }, []);

  const intensityMap = {
    light: 0.05,
    medium: 0.1,
    strong: 0.15,
  };

  // Use theme colors instead of hardcoded variants
  const colors = {
    primary: themeColors.primary,
    secondary: themeColors.secondary,
    accent: themeColors.accent,
  };
  const opacityMultiplier = intensityMap[intensity];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora waves - Optimized */}
      <motion.div
        className="absolute inset-0"
        style={{ willChange: "opacity" }}
        animate={{
          background: [
            `radial-gradient(ellipse 80% 60% at 30% -10%, rgba(${colors.primary}, ${opacityMultiplier * 1.8}), transparent 60%)`,
            `radial-gradient(ellipse 80% 60% at 70% -10%, rgba(${colors.secondary}, ${opacityMultiplier * 1.8}), transparent 60%)`,
            `radial-gradient(ellipse 80% 60% at 30% -10%, rgba(${colors.primary}, ${opacityMultiplier * 1.8}), transparent 60%)`,
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Flowing energy streams - Optimized, reduced animation */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at ${40 + i * 30}% ${30}%, 
              rgba(${colors.primary}, ${opacityMultiplier * 1.2}), 
              transparent 70%)`,
            willChange: "transform, opacity",
          }}
          animate={{
            x: ["-5%", "5%", "-5%"],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 25 + i * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 4,
          }}
        />
      ))}

      {/* Glowing orbs - Reduced blur, simplified animation */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-2xl"
          style={{
            width: `${250 + i * 120}px`,
            height: `${250 + i * 120}px`,
            left: `${20 + i * 40}%`,
            top: `${25 + i * 30}%`,
            background: `radial-gradient(circle, rgba(${i % 2 === 0 ? colors.primary : colors.secondary}, ${opacityMultiplier * 1}), transparent 70%)`,
            willChange: "transform, opacity",
          }}
          animate={{
            x: [-30, 30, -30],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 20 + i * 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 3,
          }}
        />
      ))}

      {/* Floating particles - client-only (reduced from 15 to 8) */}
      {mounted && [...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(${colors.accent}, ${opacityMultiplier * 8})`,
            boxShadow: `0 0 8px rgba(${colors.accent}, ${opacityMultiplier * 10})`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Nebula clouds */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 60% 40%, rgba(${colors.secondary}, ${opacityMultiplier * 0.8}), transparent 50%), 
                       radial-gradient(circle at 30% 70%, rgba(${colors.primary}, ${opacityMultiplier * 0.6}), transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Light rays - Reduced to 2, optimized */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${45 + i * 90}deg, 
              transparent 40%, 
              rgba(${colors.primary}, ${opacityMultiplier * 0.4}) 50%, 
              transparent 60%)`,
            willChange: "opacity",
          }}
          animate={{
            opacity: [0, 0.25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: i * 6,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
