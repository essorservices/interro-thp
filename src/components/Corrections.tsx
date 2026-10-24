import type { Question } from "@/data/exams";
import type { Statement } from "@/data/statements";
import M from "./M";

/** Verdict, justification and (for false statements) the corrected statement. */
export function StatementCorrection({ s }: { s: Statement }) {
  return (
    <div className="verdict">
      <p>
        <span className={s.truth ? "tag t" : "tag f"}>{s.truth ? "TRUE" : "FALSE"}</span>
        <M>{s.why}</M>
      </p>
      {s.fix && (
        <p className="fix">
          <span className="lbl">Correct version</span>
          <M>{s.fix}</M>
        </p>
      )}
    </div>
  );
}

/** Model answer, worked solution and a numeric check for one Part II question. */
export function QuestionCorrection({ q }: { q: Question }) {
  return (
    <div className="model">
      <div>
        <span className="lbl">Answer</span>
        <M block className="model-answer">
          {q.a}
        </M>
      </div>
      <div>
        <span className="lbl">Solution</span>
        <ol className="steps">
          {q.steps.map((step, i) => (
            <li key={i}>
              <M>{step}</M>
            </li>
          ))}
        </ol>
      </div>
      <p className="check">
        <span className="lbl">Check</span>
        <M>{q.check}</M>
      </p>
    </div>
  );
}
