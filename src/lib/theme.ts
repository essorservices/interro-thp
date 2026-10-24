import { useSyncExternalStore } from "react";
import { THEME_KEY } from "./theme-boot";

export type Theme = "auto" | "light" | "sepia" | "dark";

export const THEMES: { id: Theme; label: string }[] = [
  { id: "auto", label: "Auto" },
  { id: "light", label: "Light" },
  { id: "sepia", label: "Sepia" },
  { id: "dark", label: "Dark" },
];

const listeners = new Set<() => void>();

function read(): Theme {
  try {
    const t = window.localStorage.getItem(THEME_KEY);
    return t === "light" || t === "sepia" || t === "dark" ? t : "auto";
  } catch {
    return "auto";
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "auto") delete root.dataset.theme;
  else root.dataset.theme = theme;
}

/** "auto" follows the system light/dark setting. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "auto");
}

export function setTheme(theme: Theme) {
  try {
    if (theme === "auto") window.localStorage.removeItem(THEME_KEY);
    else window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage blocked: the theme still applies until the page is reloaded.
  }
  applyTheme(theme);
  listeners.forEach((l) => l());
}
