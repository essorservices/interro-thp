import type { Question } from "@/data/exams";
import type { Statement } from "@/data/statements";
import M from "./M";

/** Verdict, justification and (for false statements) the corrected statement. */
export function StatementCorrection({ s }: { s: Statement }) {
  return (
    <div className="verdict">
      <p>
        <b className={s.truth ? "t" : "f"}>{s.truth ? "TRUE" : "FALSE"}.</b> <M>{s.why}</M>
      </p>
      {s.fix && (
        <p className="fix">
          <span className="lbl">Correct version</span> <M>{s.fix}</M>
        </p>
      )}
    </div>
  );
}

/** Model answer, worked solution and a numeric check for one Part II question. */
export function QuestionCorrection({ q }: { q: Question }) {
  return (
    <div className="model">
      <div className="answer">
        <span className="lbl">Answer</span>
        <M className="a">{q.a}</M>
      </div>
      <div className="lbl">Solution</div>
      <ol className="steps">
        {q.steps.map((step, i) => (
          <li key={i}>
            <M>{step}</M>
          </li>
        ))}
      </ol>
      <p className="check">
        <span className="lbl">Check</span> <M>{q.check}</M>
      </p>
    </div>
  );
}
