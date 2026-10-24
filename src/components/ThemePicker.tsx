"use client";

import { THEMES, setTheme, useTheme } from "@/lib/theme";

/** Reading theme switch: Auto (system) / Light / Sepia / Dark. */
export default function ThemePicker() {
  const current = useTheme();
  return (
    <div className="theme-picker" role="group" aria-label="Reading theme">
      {THEMES.map((t) => (
        <button key={t.id} type="button" aria-pressed={current === t.id} onClick={() => setTheme(t.id)}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
