"use client";

import { useProgress } from "@/lib/progress";
import { scoreOf } from "@/lib/score";

/** Last score on an interro, once it has been corrected. */
export default function ScoreBadge({ index }: { index: number }) {
  const p = useProgress(index);
  if (!p.corrected) return null;
  const { total } = scoreOf(index, p);
  return (
    <span className="badge" aria-label={`Last score ${total} out of 20`}>
      {total}/20
    </span>
  );
}
