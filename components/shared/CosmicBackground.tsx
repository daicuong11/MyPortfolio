"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTheme } from "@/contexts/ThemeContext";

interface CosmicBackgroundProps {
  intensity?: "light" | "medium" | "strong";
}

export default function CosmicBackground({ 
  intensity = "medium" 
}: CosmicBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const { colors: themeColors } = useThemeColors();
  const { currentTheme } = useTheme();

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

  // Render different effects based on theme
  const renderThemeEffects = () => {
    if (!mounted) return null;

    switch (currentTheme) {
      case "spring":
        return renderSpringEffects();
      case "summer":
        return renderSummerEffects();
      case "autumn":
        return renderAutumnEffects();
      case "winter":
        return renderWinterEffects();
      case "space":
      default:
        return renderSpaceEffects();
    }
  };

  // Spring: Cherry Blossoms
  const renderSpringEffects = () => (
    <>
      {/* Cherry blossoms - floating petals */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 8 + 4 + "px",
            height: Math.random() * 8 + 4 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            background: `rgba(${colors.primary}, ${0.6 + Math.random() * 0.4})`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(${colors.accent}, 0.5)`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 + 50],
            rotate: [0, Math.random() * 360],
            opacity: [0.8, 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );

  // Summer: Fireflies & Sun Rays
  const renderSummerEffects = () => (
    <>
      {/* Fireflies - glowing particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`firefly-${i}`}
          className="absolute rounded-full"
          style={{
            width: "6px",
            height: "6px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            background: `rgba(${colors.accent}, 1)`,
            boxShadow: `0 0 ${Math.random() * 20 + 10}px rgba(${colors.accent}, 0.8)`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );

  // Autumn: Falling Leaves
  const renderAutumnEffects = () => (
    <>
      {/* Falling leaves */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute"
          style={{
            width: Math.random() * 12 + 6 + "px",
            height: Math.random() * 12 + 6 + "px",
            left: Math.random() * 100 + "%",
            top: -20 + "%",
            background: `rgba(${colors.primary}, ${0.7 + Math.random() * 0.3})`,
            borderRadius: "50% 0 50% 0",
            boxShadow: `0 0 10px rgba(${colors.secondary}, 0.4)`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [0, "120vh"],
            rotate: [0, Math.random() * 360 + 360],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </>
  );

  // Winter: Snowflakes
  const renderWinterEffects = () => (
    <>
      {/* Snowflakes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`snow-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 3 + "px",
            height: Math.random() * 6 + 3 + "px",
            left: Math.random() * 100 + "%",
            top: -10 + "%",
            background: `rgba(${colors.accent}, ${0.7 + Math.random() * 0.3})`,
            boxShadow: `0 0 ${Math.random() * 8 + 4}px rgba(${colors.accent}, 0.6)`,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, "120vh"],
            opacity: [0.8, 0.4],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </>
  );

  // Space: Stars & Orbs (original cosmic effects)
  const renderSpaceEffects = () => (
    <>
      {/* Floating orbs */}
      {mounted && [...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            background: `rgba(${colors.accent}, ${0.6 + Math.random() * 0.4})`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(${colors.accent}, 0.8)`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );

  // Render base gradients based on theme
  const renderBaseGradients = () => {
    switch (currentTheme) {
      case "spring":
        return (
          <>
            {/* Soft pink aurora */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `radial-gradient(ellipse 80% 60% at 30% -10%, rgba(${colors.primary}, ${opacityMultiplier * 1.5}), transparent 60%)`,
                  `radial-gradient(ellipse 80% 60% at 70% -10%, rgba(${colors.secondary}, ${opacityMultiplier * 1.5}), transparent 60%)`,
                  `radial-gradient(ellipse 80% 60% at 30% -10%, rgba(${colors.primary}, ${opacityMultiplier * 1.5}), transparent 60%)`,
                ],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            {/* Pink glow orbs */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`glow-${i}`}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: "300px",
                  height: "300px",
                  left: `${30 + i * 40}%`,
                  top: `${20 + i * 50}%`,
                  background: `radial-gradient(circle, rgba(${colors.primary}, ${opacityMultiplier * 0.6}), transparent)`,
                }}
                animate={{
                  x: [-20, 20, -20],
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </>
        );
      
      case "summer":
        return (
          <>
            {/* Golden sun rays */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ray-${i}`}
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${60 + i * 60}deg, 
                    transparent 45%, 
                    rgba(${colors.accent}, ${opacityMultiplier * 0.5}) 50%, 
                    transparent 55%)`,
                }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 2 }}
              />
            ))}
            {/* Warm glow */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 30%, rgba(${colors.primary}, ${opacityMultiplier * 1.2}), transparent 60%)`,
              }}
              animate={{ opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </>
        );
      
      case "autumn":
        return (
          <>
            {/* Warm gradient waves */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `radial-gradient(ellipse 70% 50% at 20% 20%, rgba(${colors.primary}, ${opacityMultiplier * 1.3}), transparent 50%)`,
                  `radial-gradient(ellipse 70% 50% at 80% 20%, rgba(${colors.secondary}, ${opacityMultiplier * 1.3}), transparent 50%)`,
                  `radial-gradient(ellipse 70% 50% at 20% 20%, rgba(${colors.primary}, ${opacityMultiplier * 1.3}), transparent 50%)`,
                ],
              }}
              transition={{ duration: 18, repeat: Infinity }}
            />
            {/* Warm glows */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`glow-${i}`}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: "250px",
                  height: "250px",
                  left: `${25 + i * 50}%`,
                  top: `${30 + i * 30}%`,
                  background: `radial-gradient(circle, rgba(${i === 0 ? colors.primary : colors.secondary}, ${opacityMultiplier * 0.7}), transparent)`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{ duration: 12 + i * 4, repeat: Infinity }}
              />
            ))}
          </>
        );
      
      case "winter":
        return (
          <>
            {/* Cool blue aurora */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `radial-gradient(ellipse 80% 60% at 40% 10%, rgba(${colors.accent}, ${opacityMultiplier * 1.8}), transparent 60%)`,
                  `radial-gradient(ellipse 80% 60% at 60% 10%, rgba(${colors.primary}, ${opacityMultiplier * 1.8}), transparent 60%)`,
                  `radial-gradient(ellipse 80% 60% at 40% 10%, rgba(${colors.accent}, ${opacityMultiplier * 1.8}), transparent 60%)`,
                ],
              }}
              transition={{ duration: 15, repeat: Infinity }}
            />
            {/* Ice crystal glows */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ice-${i}`}
                className="absolute rounded-full blur-2xl"
                style={{
                  width: "200px",
                  height: "200px",
                  left: `${20 + i * 30}%`,
                  top: `${15 + i * 35}%`,
                  background: `radial-gradient(circle, rgba(${colors.accent}, ${opacityMultiplier * 0.5}), transparent)`,
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 10 + i * 3, repeat: Infinity }}
              />
            ))}
          </>
        );
      
      case "space":
      default:
        return (
          <>
            {/* Aurora waves */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `radial-gradient(ellipse 80% 60% at 30% -10%, rgba(${colors.primary}, ${opacityMultiplier * 1.8}), transparent 60%)`,
                  `radial-gradient(ellipse 80% 60% at 70% -10%, rgba(${colors.secondary}, ${opacityMultiplier * 1.8}), transparent 60%)`,
                  `radial-gradient(ellipse 80% 60% at 30% -10%, rgba(${colors.primary}, ${opacityMultiplier * 1.8}), transparent 60%)`,
                ],
              }}
              transition={{ duration: 18, repeat: Infinity }}
            />
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
              }}
              transition={{ duration: 20, repeat: Infinity }}
            />
            {/* Light rays */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`ray-${i}`}
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${45 + i * 90}deg, 
                    transparent 40%, 
                    rgba(${colors.primary}, ${opacityMultiplier * 0.4}) 50%, 
                    transparent 60%)`,
                }}
                animate={{ opacity: [0, 0.25, 0] }}
                transition={{ duration: 12, repeat: Infinity, delay: i * 6 }}
              />
            ))}
          </>
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradients and glows - theme specific */}
      {renderBaseGradients()}

      {/* Theme-specific particle effects */}
      {renderThemeEffects()}
    </div>
  );
}
