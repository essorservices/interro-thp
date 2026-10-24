"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const FULL = 60 * 60;

/** 60-minute countdown, like the real interro. Tap the time to start or pause. */
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
  const classes = ["clock", ticking && "on", left <= 300 && "low"].filter(Boolean).join(" ");

  return (
    <div className="timer">
      <button
        type="button"
        className={classes}
        disabled={left === 0}
        onClick={() => setRunning((r) => !r)}
        aria-label={ticking ? "Pause the timer" : "Start the timer"}
      >
        <Icon name={ticking ? "pause" : "play"} size={14} />
        <span>{left === 0 ? "Time's up" : `${mm}:${ss}`}</span>
      </button>
      {(running || left !== FULL) && (
        <button
          type="button"
          className="icon-btn"
          aria-label="Reset the timer"
          onClick={() => {
            setRunning(false);
            setLeft(FULL);
          }}
        >
          <Icon name="reset" size={18} />
        </button>
      )}
    </div>
  );
}
