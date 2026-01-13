"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SummerBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Summer gradient waves - warm golden */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ willChange: "opacity" }}
        animate={{
          background: [
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(251, 191, 36, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(249, 115, 22, 0.2), transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 20% 50%, rgba(251, 191, 36, 0.2), transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(251, 191, 36, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(249, 115, 22, 0.2), transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Sunshine rays */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-0 left-1/2 origin-top"
          style={{
            width: "2px",
            height: "100%",
            background: `linear-gradient(180deg, rgba(251, 191, 36, ${0.3 + Math.random() * 0.2}), transparent 60%)`,
            transform: `rotate(${(i * 360) / 8}deg)`,
            transformOrigin: "top center",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Fireflies - client-only */}
      {mounted && [...Array(25)].map((_, i) => (
        <motion.div
          key={`firefly-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${3 + Math.random() * 3}px`,
            height: `${3 + Math.random() * 3}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(251, 191, 36, 1), rgba(249, 115, 22, 0.5))`,
            boxShadow: `0 0 ${10 + Math.random() * 10}px rgba(251, 191, 36, 0.8)`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating light particles - client-only */}
      {mounted && [...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 2}px`,
            height: `${2 + Math.random() * 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(251, 191, 36, ${0.6 + Math.random() * 0.4})`,
            boxShadow: "0 0 8px rgba(251, 191, 36, 0.6)",
          }}
          animate={{
            y: [0, -100, 0],
            x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 50],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Warm clouds */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute rounded-full blur-2xl"
          style={{
            width: `${350 + i * 100}px`,
            height: `${250 + i * 50}px`,
            left: `${i * 30}%`,
            top: `${i * 20}%`,
            background: `radial-gradient(circle, rgba(251, 191, 36, 0.08), transparent 70%)`,
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

      {/* Glowing sun orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-xl"
          style={{
            width: `${180 + i * 60}px`,
            height: `${180 + i * 60}px`,
            left: `${20 + i * 25}%`,
            top: `${30 + i * 20}%`,
            background: `radial-gradient(circle, rgba(251, 191, 36, 0.12), transparent 60%)`,
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

      {/* Heat shimmer effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(251, 191, 36, 0.08), rgba(249, 115, 22, 0.05) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Sparkles - client-only */}
      {mounted && [...Array(12)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: "2px",
            height: "2px",
          }}
        >
          <motion.div
            className="w-full h-full"
            style={{
              background: "rgba(251, 191, 36, 1)",
              boxShadow: "0 0 10px rgba(251, 191, 36, 1), 0 0 20px rgba(251, 191, 36, 0.5)",
            }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
