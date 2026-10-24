import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { QuestionCorrection, StatementCorrection } from "@/components/Corrections";
import M from "@/components/M";
import PaperLoading from "@/components/PaperLoading";
import PrintButton from "@/components/PrintButton";
import TopBar from "@/components/TopBar";
import { EXAMS, RECALL, TM_RECALL, parseExamId } from "@/data/exams";
import { STATEMENTS } from "@/data/statements";

type Params = PageProps<"/exam/[id]/solution">["params"];

export function generateStaticParams() {
  return EXAMS.map((_, i) => ({ id: String(i + 1) }));
}

export async function generateMetadata(props: PageProps<"/exam/[id]/solution">): Promise<Metadata> {
  const { id } = await props.params;
  const index = parseExamId(id);
  return { title: index === null ? "Solution" : `Solution · Interro ${id} · ${EXAMS[index].title}` };
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
      <TopBar title={`Solution · Interro ${index + 1}`} subtitle={exam.title}>
        <Link className="btn small" href={`/exam/${index + 1}`}>
          Take it
        </Link>
        <PrintButton />
      </TopBar>

      <main className="sheet">
        <section className="part">
          <h2>
            Part I <span>Statements to tick</span>
          </h2>
          <p className="key">
            {trueNumbers.map((n) => (
              <span className="key-chip" key={n}>
                {n}
              </span>
            ))}
          </p>
          <ol className="st sol">
            {exam.p1.map((sid, j) => {
              const s = STATEMENTS[sid];
              return (
                <li key={sid}>
                  <div className="st-row">
                    <span className={s.truth ? "dot on" : "dot"} aria-label={s.truth ? "true" : "false"} />
                    <span className="st-text">
                      <span className="st-num">{j + 1}.</span>
                      <M>{s.text}</M>
                    </span>
                  </div>
                  <StatementCorrection s={s} />
                </li>
              );
            })}
          </ol>
        </section>

        <section className="part">
          <h2>
            Part II <span>Worked solutions</span>
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
                <QuestionCorrection q={q} />
              </li>
            ))}
          </ol>
        </section>

        <nav className="pager" aria-label="Other solutions">
          {index > 0 ? <Link href={`/exam/${index}/solution`}>← Interro {index}</Link> : <span />}
          {index < EXAMS.length - 1 ? <Link href={`/exam/${index + 2}/solution`}>Interro {index + 2} →</Link> : <span />}
        </nav>
      </main>
    </>
  );
}
