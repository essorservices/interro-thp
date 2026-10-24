import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { QuestionCorrection, StatementCorrection } from "@/components/Corrections";
import M from "@/components/M";
import PaperLoading from "@/components/PaperLoading";
import PrintButton from "@/components/PrintButton";
import { EXAMS, RECALL, TM_RECALL, parseExamId } from "@/data/exams";
import { STATEMENTS } from "@/data/statements";

type Params = PageProps<"/exam/[id]/solution">["params"];

export function generateStaticParams() {
  return EXAMS.map((_, i) => ({ id: String(i + 1) }));
}

export async function generateMetadata(props: PageProps<"/exam/[id]/solution">): Promise<Metadata> {
  const { id } = await props.params;
  return { title: `Solution · Mock ${id}` };
}

// The params are read inside <Suspense> so navigations into this page stay instant.
export default function SolutionPage(props: PageProps<"/exam/[id]/solution">) {
  return (
    <Suspense fallback={<PaperLoading />}>
      <Solution params={props.params} />
    </Suspense>
  );
}

async function Solution({ params }: { params: Params }) {
  const { id } = await params;
  const index = parseExamId(id);
  if (index === null) notFound();
  const exam = EXAMS[index];
  const trueNumbers = exam.p1.flatMap((sid, j) => (STATEMENTS[sid].truth ? [j + 1] : []));

  return (
    <>
      <div className="exam-bar plain no-print">
        <Link href="/">← All papers</Link>
        <div className="bar-actions">
          <Link className="btn" href={`/exam/${index + 1}`}>
            Take this paper
          </Link>
          <PrintButton />
        </div>
      </div>

      <main className="paper">
        <div className="phead">
          <span>1CS · Computability Theory</span>
          <span>Correction · Mock Interro {index + 1} / 10</span>
        </div>
        <p className="focus">Focus: {exam.focus}</p>

        <div className="band">Part I (sur 10 points)</div>
        <p className="key">
          <b>Answer key.</b> True statements: {trueNumbers.join(", ")}. The other {20 - trueNumbers.length} are
          false. A filled dot ● marks a statement to tick.
        </p>
        <ol className="st sol">
          {exam.p1.map((sid, j) => {
            const s = STATEMENTS[sid];
            return (
              <li key={sid}>
                <div className="srow">
                  <span className={s.truth ? "dot on" : "dot"} aria-label={s.truth ? "true" : "false"} />
                  <span className="num">{j + 1}.</span>
                  <M>{s.text}</M>
                </div>
                <StatementCorrection s={s} />
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
              <QuestionCorrection q={q} />
            </li>
          ))}
        </ol>
      </main>

      <nav className="pager no-print" aria-label="Other solutions">
        {index > 0 ? <Link href={`/exam/${index}/solution`}>← Solution {index}</Link> : <span />}
        {index < EXAMS.length - 1 ? <Link href={`/exam/${index + 2}/solution`}>Solution {index + 2} →</Link> : <span />}
      </nav>
    </>
  );
}
