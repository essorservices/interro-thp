import { useSyncExternalStore } from "react";

/** What the student did on one paper. Keys of the records are question indexes. */
export type Progress = {
  checks: Record<string, boolean>;
  answers: Record<string, string>;
  /** Part II self-marking: 1 = correct, 0 = wrong. */
  self: Record<string, 0 | 1>;
  corrected: boolean;
};

type AllProgress = Record<string, Progress>;

export const EMPTY_PROGRESS: Progress = { checks: {}, answers: {}, self: {}, corrected: false };

const KEY = "computability-mocks:v1";
const NOTHING_SAVED: AllProgress = {};
const listeners = new Set<() => void>();
let cache: AllProgress | null = null;

function read(): AllProgress {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as AllProgress) : {};
  } catch {
    cache = {};
  }
  return cache;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keep several open tabs in sync.
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      onChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** Progress for one paper, saved in localStorage. Empty during server rendering. */
export function useProgress(index: number): Progress {
  const all = useSyncExternalStore(subscribe, read, () => NOTHING_SAVED);
  return all[`e${index}`] ?? EMPTY_PROGRESS;
}

export function updateProgress(index: number, change: (p: Progress) => Progress) {
  const all = read();
  const key = `e${index}`;
  cache = { ...all, [key]: change(all[key] ?? EMPTY_PROGRESS) };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // Storage blocked (private window): progress just isn't kept across reloads.
  }
  listeners.forEach((l) => l());
}
