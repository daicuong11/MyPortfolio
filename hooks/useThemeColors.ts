import { useTheme } from "@/contexts/ThemeContext";
import { themeConfigs } from "@/lib/themes";

export function useThemeColors() {
  const { currentTheme } = useTheme();
  const colors = themeConfigs[currentTheme];

  return {
    colors,
    gradientClasses: `from-${colors.gradient.from} via-${colors.gradient.via} to-${colors.gradient.to}`,
    glowColor: colors.glow,
    // Utility functions
    getGlowStyle: (intensity: number = 0.3) => ({
      boxShadow: `0 0 ${20 * intensity}px rgba(${colors.primary}, ${intensity})`,
    }),
    getBorderStyle: (opacity: number = 0.3) => ({
      borderColor: `rgba(${colors.accent}, ${opacity})`,
    }),
    getBackgroundGradient: (opacity: number = 0.1) => 
      `linear-gradient(135deg, rgba(${colors.primary}, ${opacity}), rgba(${colors.secondary}, ${opacity * 0.8}))`,
  };
}
