"use client";

import Link from "next/link";
import { useRef } from "react";
import { EXAMS, RECALL, TM_RECALL } from "@/data/exams";
import { STATEMENTS } from "@/data/statements";
import { EMPTY_PROGRESS, updateProgress, useProgress } from "@/lib/progress";
import { scoreOf } from "@/lib/score";
import { QuestionCorrection, StatementCorrection } from "./Corrections";
import M from "./M";
import Timer from "./Timer";

/** One paper you can answer, correct and self-mark. Answers are kept in localStorage. */
export default function ExamRunner({ index }: { index: number }) {
  const exam = EXAMS[index];
  const p = useProgress(index);
  const done = p.corrected;
  const score = scoreOf(index, p);
  const paperRef = useRef<HTMLElement>(null);

  const correct = () => {
    updateProgress(index, (prev) => ({ ...prev, corrected: true }));
    requestAnimationFrame(() => paperRef.current?.scrollIntoView({ block: "start" }));
  };

  const setSelf = (j: number, value: 0 | 1) =>
    updateProgress(index, (prev) => {
      const self = { ...prev.self };
      if (self[j] === value) delete self[j];
      else self[j] = value;
      return { ...prev, self };
    });

  return (
    <>
      <div className="exam-bar">
        <Link href="/">← All papers</Link>
        <Timer />
      </div>

      <main className="paper" ref={paperRef}>
        <div className="phead">
          <span>1CS · Computability Theory</span>
          <span>Mock Interro {index + 1} / 10</span>
        </div>
        <p className="focus">Focus: {exam.focus}</p>

        {done && (
          <div className="score">
            <div>
              <div className="k">Part I</div>
              <div className="v">
                {score.part1}
                <small>/10</small>
              </div>
            </div>
            <div>
              <div className="k">Part II</div>
              <div className="v">
                {score.part2}
                <small>/10</small>
              </div>
              <div className="note">self-marked {score.marked}/5</div>
            </div>
            <div className="total">
              <div className="k">Total</div>
              <div className="v">
                {score.total}
                <small>/20</small>
              </div>
            </div>
          </div>
        )}

        <div className="dur">Duration 1h</div>

        <div className="band">Part I (sur 10 points)</div>
        <p className="instr">
          Check the correct answers
          <span>{done ? "Green = handled correctly, red = mistake." : "0.5 per statement."}</span>
        </p>
        <ol className="st">
          {exam.p1.map((id, j) => {
            const s = STATEMENTS[id];
            const checked = !!p.checks[j];
            const right = checked === s.truth;
            return (
              <li key={id} className={done ? (right ? "ok" : "bad") : undefined}>
                <label>
                  <input
                    type="checkbox"
                    id={`e${index}-s${j}`}
                    checked={checked}
                    disabled={done}
                    onChange={(e) => {
                      const value = e.target.checked;
                      updateProgress(index, (prev) => ({ ...prev, checks: { ...prev.checks, [j]: value } }));
                    }}
                  />
                  <M>{s.text}</M>
                </label>
                {done && (
                  <div className="verdict-row">
                    <span className="mark" aria-label={right ? "You got it right" : "You got it wrong"}>
                      {right ? "✓" : "✗"}
                    </span>
                    <StatementCorrection s={s} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="band">
          Part II (sur 10 points)<small>(2 points / correct answer)</small>
        </div>
        <div className="recall">
          <M block>{RECALL}</M>
          {exam.tm && <M block>{TM_RECALL}</M>}
        </div>
        <ol className="qs">
          {exam.p2.map((q, j) => (
            <li key={j}>
              <M block>{q.q}</M>
              {q.code && <pre className="tm">{q.code}</pre>}
              <div className="ansrow">
                <label htmlFor={`e${index}-q${j}`}>Your answer →</label>
                <input
                  type="text"
                  id={`e${index}-q${j}`}
                  value={p.answers[j] ?? ""}
                  readOnly={done}
                  autoComplete="off"
                  spellCheck={false}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateProgress(index, (prev) => ({ ...prev, answers: { ...prev.answers, [j]: value } }));
                  }}
                />
              </div>
              {done && (
                <>
                  <QuestionCorrection q={q} />
                  <div className="self">
                    Mark yourself:
                    <button type="button" className="btn yes" aria-pressed={p.self[j] === 1} onClick={() => setSelf(j, 1)}>
                      Correct (2 pts)
                    </button>
                    <button type="button" className="btn no" aria-pressed={p.self[j] === 0} onClick={() => setSelf(j, 0)}>
                      Wrong
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>

        <div className="actions">
          {!done && (
            <button type="button" className="btn primary" onClick={correct}>
              Correct my paper
            </button>
          )}
          <button type="button" className="btn" onClick={() => updateProgress(index, () => EMPTY_PROGRESS)}>
            {done ? "Retake this paper" : "Clear my answers"}
          </button>
          {done && (
            <Link className="btn" href={`/exam/${index + 1}/solution`}>
              Full solution
            </Link>
          )}
          {index < EXAMS.length - 1 && (
            <Link className="btn" href={`/exam/${index + 2}`}>
              Next paper →
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
