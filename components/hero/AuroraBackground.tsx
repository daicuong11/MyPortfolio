"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AuroraBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora waves - Optimized with will-change */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ willChange: "opacity" }}
        animate={{
          background: [
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(99, 102, 241, 0.2), transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 20% 50%, rgba(139, 92, 246, 0.2), transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(99, 102, 241, 0.2), transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Flowing aurora curtains - Reduced to 2, optimized */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 100% 60% at ${30 + i * 30}% ${20 + i * 15}%, 
              rgba(${99 + i * 30}, ${102 - i * 15}, ${241 - i * 40}, 0.12), 
              transparent 70%)`,
            willChange: "transform, opacity",
          }}
          animate={{
            x: ["-10%", "10%", "-10%"],
            y: ["-5%", "5%", "-5%"],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 3,
          }}
        />
      ))}

      {/* Cosmic dust clouds - Reduced to 3, lighter blur */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute rounded-full blur-2xl"
          style={{
            width: `${350 + i * 100}px`,
            height: `${250 + i * 50}px`,
            left: `${i * 30}%`,
            top: `${i * 20}%`,
            background: `radial-gradient(circle, rgba(${59 + i * 40}, ${130 + i * 25}, ${246 - i * 40}, 0.08), transparent 70%)`,
            willChange: "transform, opacity",
          }}
          animate={{
            x: [0, 50, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 25 + i * 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Nebula effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08), rgba(59, 130, 246, 0.05) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Shooting stars - client-only */}
      {mounted && [...Array(3)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.8), 0 0 20px 4px rgba(99, 102, 241, 0.6)",
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: [0, 200],
            y: [0, 200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 5 + Math.random() * 3,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Twinkling stars - client-only (reduced from 50 to 30) */}
      {mounted && [...Array(30)].map((_, i) => (
        <motion.div
          key={`twinkle-${i}`}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing orbs - Reduced to 3, lighter blur */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-xl"
          style={{
            width: `${180 + i * 60}px`,
            height: `${180 + i * 60}px`,
            left: `${20 + i * 25}%`,
            top: `${30 + i * 20}%`,
            background: `radial-gradient(circle, rgba(${139 - i * 25}, ${92 + i * 35}, ${246 - i * 50}, 0.12), transparent 60%)`,
            willChange: "transform, opacity",
          }}
          animate={{
            x: [-20, 20, -20],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Energy particles - client-only (reduced from 20 to 10) */}
      {mounted && [...Array(10)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(${99 + Math.random() * 100}, ${102 + Math.random() * 100}, 241, 0.6)`,
            boxShadow: `0 0 10px rgba(${99 + Math.random() * 100}, ${102 + Math.random() * 100}, 241, 0.8)`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
