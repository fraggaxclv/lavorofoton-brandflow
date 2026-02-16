import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "interno-dark-mode";

export function useInternoDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(STORAGE_KEY, String(isDark));
  }, [isDark]);

  // Remove dark class when leaving internal pages
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  const toggle = useCallback(() => setIsDark(prev => !prev), []);

  return { isDark, toggle, setIsDark };
}
