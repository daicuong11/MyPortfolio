"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SpringBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Spring gradient waves */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ willChange: "opacity" }}
        animate={{
          background: [
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(236, 72, 153, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(219, 39, 119, 0.2), transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(219, 39, 119, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 20% 50%, rgba(244, 114, 182, 0.2), transparent 50%)",
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(236, 72, 153, 0.3), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(219, 39, 119, 0.2), transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Flowing pink curtains */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 100% 60% at ${30 + i * 30}% ${20 + i * 15}%, 
              rgba(${236 - i * 20}, ${72 + i * 30}, ${153 - i * 20}, 0.12), 
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

      {/* Cherry blossom petals - client-only */}
      {mounted && [...Array(20)].map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${-10 + Math.random() * 20}%`,
            width: `${8 + Math.random() * 6}px`,
            height: `${8 + Math.random() * 6}px`,
            borderRadius: "50% 0 50% 0",
            background: `linear-gradient(135deg, rgba(236, 72, 153, ${0.6 + Math.random() * 0.4}), rgba(244, 114, 182, ${0.4 + Math.random() * 0.3}))`,
            boxShadow: "0 0 10px rgba(236, 72, 153, 0.5)",
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}

      {/* Green leaves - client-only */}
      {mounted && [...Array(10)].map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${-10 + Math.random() * 20}%`,
            width: `${6 + Math.random() * 4}px`,
            height: `${10 + Math.random() * 6}px`,
            borderRadius: "0 50% 50% 0",
            background: `linear-gradient(135deg, rgba(34, 197, 94, ${0.5 + Math.random() * 0.3}), rgba(74, 222, 128, ${0.3 + Math.random() * 0.2}))`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, (Math.random() - 0.5) * 150],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear",
          }}
        />
      ))}

      {/* Pink clouds */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute rounded-full blur-2xl"
          style={{
            width: `${350 + i * 100}px`,
            height: `${250 + i * 50}px`,
            left: `${i * 30}%`,
            top: `${i * 20}%`,
            background: `radial-gradient(circle, rgba(236, 72, 153, 0.08), transparent 70%)`,
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

      {/* Glowing pink orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-xl"
          style={{
            width: `${180 + i * 60}px`,
            height: `${180 + i * 60}px`,
            left: `${20 + i * 25}%`,
            top: `${30 + i * 20}%`,
            background: `radial-gradient(circle, rgba(236, 72, 153, 0.12), transparent 60%)`,
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

      {/* Butterfly sparkles - client-only */}
      {mounted && [...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(236, 72, 153, 0.8)`,
            boxShadow: `0 0 10px rgba(236, 72, 153, 0.8)`,
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

      {/* Nebula effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.08), rgba(34, 197, 94, 0.05) 40%, transparent 70%)",
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
    </div>
  );
}
