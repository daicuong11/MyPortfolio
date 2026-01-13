"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function WinterBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Winter gradient waves - icy blue */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ willChange: "opacity" }}
        animate={{
          background: [
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(147, 197, 253, 0.2), transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(147, 197, 253, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 20% 50%, rgba(191, 219, 254, 0.2), transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(147, 197, 253, 0.2), transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Snowflakes - various sizes - client-only */}
      {mounted && [...Array(40)].map((_, i) => {
        const size = 4 + Math.random() * 6;
        return (
          <motion.div
            key={`snow-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${-10 + Math.random() * 20}%`,
            }}
          >
            {/* Snowflake SVG */}
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
              style={{
                filter: `drop-shadow(0 0 2px rgba(191, 219, 254, 0.8))`,
              }}
            >
              <path
                d="M12 2L12 22M2 12L22 12M5 5L19 19M19 5L5 19M12 2L9 5M12 2L15 5M12 22L9 19M12 22L15 19M2 12L5 9M2 12L5 15M22 12L19 9M22 12L19 15"
                stroke="rgba(191, 219, 254, 0.9)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <motion.div
              className="w-full h-full"
              animate={{
                y: [0, window.innerHeight + 100],
                x: [0, (Math.random() - 0.5) * 100],
                rotate: [0, 360],
                opacity: [0, 1, 1, 0.7, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "linear",
              }}
            />
          </motion.div>
        );
      })}

      {/* Frost particles - client-only */}
      {mounted && [...Array(20)].map((_, i) => (
        <motion.div
          key={`frost-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(191, 219, 254, ${0.6 + Math.random() * 0.4})`,
            boxShadow: "0 0 4px rgba(191, 219, 254, 0.8)",
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Aurora borealis effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 197, 253, 0.1) 30%, transparent 60%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Icy clouds */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute rounded-full blur-2xl"
          style={{
            width: `${350 + i * 100}px`,
            height: `${250 + i * 50}px`,
            left: `${i * 30}%`,
            top: `${i * 20}%`,
            background: `radial-gradient(circle, rgba(147, 197, 253, 0.08), transparent 70%)`,
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

      {/* Glowing ice orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-xl"
          style={{
            width: `${180 + i * 60}px`,
            height: `${180 + i * 60}px`,
            left: `${20 + i * 25}%`,
            top: `${30 + i * 20}%`,
            background: `radial-gradient(circle, rgba(147, 197, 253, 0.12), transparent 60%)`,
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

      {/* Ice crystals - client-only */}
      {mounted && [...Array(12)].map((_, i) => (
        <motion.div
          key={`crystal-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <motion.div
            style={{
              width: "3px",
              height: "3px",
              background: "rgba(191, 219, 254, 1)",
              boxShadow: "0 0 10px rgba(191, 219, 254, 1), 0 0 20px rgba(147, 197, 253, 0.5)",
            }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 1, 0],
              rotate: [0, 90, 0],
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

      {/* Frost overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.06), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
