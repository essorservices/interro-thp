"use client";

import { useEffect, useState } from "react";

const FULL = 60 * 60;

/** 60-minute countdown, like the real interro. */
export default function Timer() {
  const [left, setLeft] = useState(FULL);
  const [running, setRunning] = useState(false);
  const ticking = running && left > 0;

  useEffect(() => {
    if (!ticking) return;
    const id = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(id);
  }, [ticking]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="timer" role="group" aria-label="Exam timer">
      <span className={left <= 300 ? "clock low" : "clock"}>{left === 0 ? "Time's up" : `${mm}:${ss}`}</span>
      <button type="button" className="btn" disabled={left === 0} onClick={() => setRunning((r) => !r)}>
        {ticking ? "Pause" : left === FULL ? "Start" : "Resume"}
      </button>
      <button
        type="button"
        className="btn"
        onClick={() => {
          setRunning(false);
          setLeft(FULL);
        }}
      >
        Reset
      </button>
    </div>
  );
}
