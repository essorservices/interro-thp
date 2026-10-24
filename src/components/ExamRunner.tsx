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
import TopBar from "./TopBar";

/** One interro you can answer, correct and self-mark. Answers are kept in localStorage. */
export default function ExamRunner({ index }: { index: number }) {
  const exam = EXAMS[index];
  const p = useProgress(index);
  const done = p.corrected;
  const score = scoreOf(index, p);
  const sheetRef = useRef<HTMLElement>(null);

  const correct = () => {
    updateProgress(index, (prev) => ({ ...prev, corrected: true }));
    requestAnimationFrame(() => sheetRef.current?.scrollIntoView({ block: "start" }));
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
      <TopBar title={`Interro ${index + 1}`} subtitle={exam.title} sticky>
        <Timer />
      </TopBar>

      <main className="sheet" ref={sheetRef}>
        {done && (
          <section className="result" aria-label="Your score">
            <p className="result-total">
              <span className="big">{score.total}</span>
              <span className="of">/ 20</span>
            </p>
            <dl className="result-parts">
              <div>
                <dt>Part I</dt>
                <dd>{score.part1} / 10</dd>
              </div>
              <div>
                <dt>Part II</dt>
                <dd>
                  {score.part2} / 10 <small>· {score.marked}/5 marked</small>
                </dd>
              </div>
            </dl>
          </section>
        )}

        <section className="part">
          <h2>
            Part I <span>Tick the true statements · 10 pts</span>
          </h2>
          <ol className="st">
            {exam.p1.map((id, j) => {
              const s = STATEMENTS[id];
              const checked = !!p.checks[j];
              const right = checked === s.truth;
              return (
                <li key={id} className={done ? (right ? "ok" : "bad") : undefined}>
                  <label className={done ? "st-row marked" : "st-row"}>
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
                    <span className="st-text">
                      <span className="st-num">{j + 1}.</span>
                      <M>{s.text}</M>
                    </span>
                    {done && (
                      <span className={right ? "st-mark ok" : "st-mark bad"} aria-label={right ? "You got it right" : "You got it wrong"}>
                        {right ? "✓" : "✗"}
                      </span>
                    )}
                  </label>
                  {done && <StatementCorrection s={s} />}
                </li>
              );
            })}
          </ol>
        </section>

        <section className="part">
          <h2>
            Part II <span>2 pts per answer · 10 pts</span>
          </h2>
          <div className="recall">
            <M block>{RECALL}</M>
            {exam.tm && <M block>{TM_RECALL}</M>}
          </div>
          <ol className="qs">
            {exam.p2.map((q, j) => (
              <li key={j}>
                <div className="q-head">
                  <span className="q-num">{j + 1}</span>
                  <M block className="q-text">
                    {q.q}
                  </M>
                </div>
                {q.code && <pre className="tm">{q.code}</pre>}
                <input
                  type="text"
                  className="answer-input"
                  id={`e${index}-q${j}`}
                  aria-label={`Your answer to question ${j + 1}`}
                  placeholder="Your answer"
                  value={p.answers[j] ?? ""}
                  readOnly={done}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateProgress(index, (prev) => ({ ...prev, answers: { ...prev.answers, [j]: value } }));
                  }}
                />
                {done && (
                  <>
                    <QuestionCorrection q={q} />
                    <div className="self" role="group" aria-label={`Mark your answer to question ${j + 1}`}>
                      <button
                        type="button"
                        className="seg yes"
                        aria-pressed={p.self[j] === 1}
                        onClick={() => setSelf(j, 1)}
                      >
                        I got it · 2 pts
                      </button>
                      <button type="button" className="seg no" aria-pressed={p.self[j] === 0} onClick={() => setSelf(j, 0)}>
                        I missed it
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ol>
        </section>

        <div className="actions">
          {done ? (
            <>
              <Link className="btn primary" href={`/exam/${index + 1}/solution`}>
                Full solution
              </Link>
              {index < EXAMS.length - 1 && (
                <Link className="btn" href={`/exam/${index + 2}`}>
                  Next interro
                </Link>
              )}
              <button type="button" className="btn ghost" onClick={() => updateProgress(index, () => EMPTY_PROGRESS)}>
                Retake this interro
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn primary" onClick={correct}>
                Correct my paper
              </button>
              <button type="button" className="btn ghost" onClick={() => updateProgress(index, () => EMPTY_PROGRESS)}>
                Clear my answers
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
}
