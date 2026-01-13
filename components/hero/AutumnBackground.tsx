"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AutumnBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Autumn gradient waves */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ willChange: "opacity" }}
        animate={{
          background: [
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(161, 98, 7, 0.2), transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(161, 98, 7, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 20% 50%, rgba(220, 38, 38, 0.2), transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(161, 98, 7, 0.2), transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Falling leaves - various types - client-only */}
      {mounted && [...Array(30)].map((_, i) => {
        const leafType = Math.floor(Math.random() * 3);
        const colors = [
          { color1: "249, 115, 22", color2: "234, 88, 12" }, // orange
          { color1: "220, 38, 38", color2: "185, 28, 28" }, // red
          { color1: "161, 98, 7", color2: "133, 77, 14" }, // brown
        ];
        const selectedColor = colors[leafType];

        return (
          <motion.div
            key={`leaf-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${-10 + Math.random() * 20}%`,
              width: `${10 + Math.random() * 8}px`,
              height: `${12 + Math.random() * 10}px`,
            }}
          >
            {/* Maple leaf shape */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              style={{
                filter: `drop-shadow(0 0 4px rgba(${selectedColor.color1}, 0.6))`,
              }}
            >
              <path
                d="M12 2L14 8L18 6L16 12L22 12L16 16L18 22L12 18L6 22L8 16L2 12L8 12L6 6L10 8L12 2Z"
                fill={`rgba(${selectedColor.color1}, ${0.7 + Math.random() * 0.3})`}
                stroke={`rgba(${selectedColor.color2}, 0.8)`}
                strokeWidth="0.5"
              />
            </svg>
            <motion.div
              className="w-full h-full"
              animate={{
                y: [0, window.innerHeight + 100],
                x: [0, (Math.random() - 0.5) * 300],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1) * 2],
                opacity: [0, 1, 1, 0.5, 0],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear",
              }}
            />
          </motion.div>
        );
      })}

      {/* Wind effect particles - client-only */}
      {mounted && [...Array(10)].map((_, i) => (
        <motion.div
          key={`wind-${i}`}
          className="absolute w-12 h-0.5 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(90deg, transparent, rgba(249, 115, 22, ${0.3 + Math.random() * 0.2}), transparent)`,
          }}
          animate={{
            x: [-100, window.innerWidth + 100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}

      {/* Warm autumn clouds */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute rounded-full blur-2xl"
          style={{
            width: `${350 + i * 100}px`,
            height: `${250 + i * 50}px`,
            left: `${i * 30}%`,
            top: `${i * 20}%`,
            background: `radial-gradient(circle, rgba(249, 115, 22, 0.08), transparent 70%)`,
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

      {/* Glowing autumn orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-xl"
          style={{
            width: `${180 + i * 60}px`,
            height: `${180 + i * 60}px`,
            left: `${20 + i * 25}%`,
            top: `${30 + i * 20}%`,
            background: `radial-gradient(circle, rgba(249, 115, 22, 0.12), transparent 60%)`,
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

      {/* Fog effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(161, 98, 7, 0.06), rgba(249, 115, 22, 0.04) 40%, transparent 70%)",
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

      {/* Ember sparkles - client-only */}
      {mounted && [...Array(8)].map((_, i) => (
        <motion.div
          key={`ember-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(249, 115, 22, 0.8)`,
            boxShadow: `0 0 8px rgba(249, 115, 22, 0.8)`,
          }}
          animate={{
            y: [0, -80, -160],
            opacity: [1, 0.6, 0],
            scale: [1, 0.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
