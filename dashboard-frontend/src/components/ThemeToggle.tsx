"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder button to avoid hydration mismatch
    return (
      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 bg-transparent">
        <Monitor size={16} className="opacity-0" />
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={cycleTheme}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
      title={`Current theme: ${theme}. Click to cycle.`}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun size={16} />
      ) : theme === "dark" ? (
        <Moon size={16} />
      ) : (
        <Monitor size={16} />
      )}
    </button>
  );
}
