import { useTheme } from "@/contexts/ThemeContext";
import { themeConfigs } from "@/lib/themes";

export function useThemeColors() {
  const { currentTheme } = useTheme();
  const colors = themeConfigs[currentTheme];

  return {
    colors,
    currentTheme,
    // Utility functions
    getTitleGradient: () => ({
      backgroundImage: `linear-gradient(90deg, rgba(${colors.primary}, 1), rgba(${colors.secondary}, 1), rgba(${colors.accent}, 1))`,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }),
    getGlowStyle: (intensity: number = 0.3) => ({
      boxShadow: `0 0 ${20 * intensity}px rgba(${colors.primary}, ${intensity})`,
    }),
    getBorderStyle: (opacity: number = 0.3) => ({
      borderColor: `rgba(${colors.accent}, ${opacity})`,
    }),
    getHoverBorderStyle: (opacity: number = 0.6) => ({
      borderColor: `rgba(${colors.accent}, ${opacity})`,
    }),
    getHoverShadowStyle: (intensity: number = 0.3) => ({
      boxShadow: `0 20px 60px rgba(${colors.primary}, ${intensity})`,
    }),
    getBackgroundGradient: (opacity: number = 0.1) => 
      `linear-gradient(135deg, rgba(${colors.primary}, ${opacity}), rgba(${colors.secondary}, ${opacity * 0.8}))`,
  };
}
