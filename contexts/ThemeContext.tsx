"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeName = "space" | "spring" | "summer" | "autumn" | "winter";

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("space");
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("portfolio-theme") as ThemeName;
    if (savedTheme && ["space", "spring", "summer", "autumn", "winter"].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("portfolio-theme", theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
