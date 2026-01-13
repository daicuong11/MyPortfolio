"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useId } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";

interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
}

export default function CircularProgress({
  progress,
  size = 40,
  strokeWidth = 2.5,
}: CircularProgressProps) {
  const gradientId = useId();
  const { colors } = useThemeColors();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
        {/* Gradient definition - dynamic based on theme */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`rgb(${colors.accent})`} />
            <stop offset="50%" stopColor={`rgb(${colors.primary})`} />
            <stop offset="100%" stopColor={`rgb(${colors.secondary})`} />
          </linearGradient>
        </defs>
      </svg>
      {/* Blinking eye icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 0.8, 1],
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Eye
            size={14}
            style={{
              color: `rgb(${colors.accent})`,
              filter: `drop-shadow(0 0 6px rgba(${colors.accent}, 0.8))`,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
