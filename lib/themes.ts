import { ThemeName } from "@/contexts/ThemeContext";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
  glow: string;
}

export const themeConfigs: Record<ThemeName, ThemeColors> = {
  space: {
    primary: "139, 92, 246", // purple
    secondary: "99, 102, 241", // indigo
    accent: "6, 182, 212", // cyan
    gradient: {
      from: "indigo-400",
      via: "purple-500",
      to: "fuchsia-500",
    },
    glow: "cyan-500",
  },
  spring: {
    primary: "236, 72, 153", // pink
    secondary: "219, 39, 119", // deep pink
    accent: "34, 197, 94", // green
    gradient: {
      from: "pink-400",
      via: "rose-500",
      to: "pink-600",
    },
    glow: "pink-500",
  },
  summer: {
    primary: "251, 191, 36", // yellow
    secondary: "249, 115, 22", // orange
    accent: "14, 165, 233", // sky blue
    gradient: {
      from: "yellow-400",
      via: "orange-500",
      to: "amber-600",
    },
    glow: "orange-500",
  },
  autumn: {
    primary: "249, 115, 22", // orange
    secondary: "161, 98, 7", // amber-700
    accent: "220, 38, 38", // red
    gradient: {
      from: "orange-400",
      via: "amber-600",
      to: "orange-700",
    },
    glow: "amber-500",
  },
  winter: {
    primary: "59, 130, 246", // blue
    secondary: "147, 197, 253", // light blue
    accent: "191, 219, 254", // sky
    gradient: {
      from: "blue-400",
      via: "cyan-500",
      to: "blue-600",
    },
    glow: "cyan-400",
  },
};

export const themeNames: Record<ThemeName, { en: string; vi: string; icon: string }> = {
  space: {
    en: "Deep Space",
    vi: "Không Gian",
    icon: "🌌",
  },
  spring: {
    en: "Spring Blossom",
    vi: "Xuân Hoa",
    icon: "🌸",
  },
  summer: {
    en: "Summer Sun",
    vi: "Hạ Nắng",
    icon: "☀️",
  },
  autumn: {
    en: "Autumn Leaves",
    vi: "Thu Lá",
    icon: "🍂",
  },
  winter: {
    en: "Winter Snow",
    vi: "Đông Tuyết",
    icon: "❄️",
  },
};
