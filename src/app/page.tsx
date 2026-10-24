import Link from "next/link";
import ScoreBadge from "@/components/ScoreBadge";
import { EXAMS } from "@/data/exams";
import { STATEMENTS } from "@/data/statements";

export default function Home() {
  return (
    <main className="home">
      <section className="intro">
        <h1>Ten mock interros, with full corrections</h1>
        <p>
          Each paper follows the 2025 interro: <b>1 hour</b>, <b>Part I</b> with 20 statements where you tick the
          true ones (10 pts), and <b>Part II</b> with 5 short answers worth 2 pts each, using the convention
          Car(x) = 0 if x ∈ E, 1 otherwise.
        </p>
        <p>
          Take a paper, press <b>Correct my paper</b> at the end, then mark your Part II answers yourself. Every
          paper also has a full solution page: the verdict and justification for every statement, the corrected
          version of every false one, and a worked solution for every Part II question.
        </p>
      </section>

      <ol className="cards">
        {EXAMS.map((exam, i) => {
          const trueCount = exam.p1.filter((id) => STATEMENTS[id].truth).length;
          return (
            <li className="card" key={i}>
              <div className="card-top">
                <span className="n">Mock {i + 1}</span>
                <ScoreBadge index={i} />
              </div>
              <p className="f">{exam.focus}</p>
              <p className="meta">
                20 statements · 5 short answers{exam.tm ? " · Turing machines" : ""}
              </p>
              <div className="card-links">
                <Link className="btn primary" href={`/exam/${i + 1}`}>
                  Take paper
                </Link>
                <Link className="btn" href={`/exam/${i + 1}/solution`} title={`${trueCount} true statements`}>
                  Solution
                </Link>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="foot">
        Built from the 2025 interro and its correction, the &quot;Calculabilité – Partie I&quot; slides and the THP01
        exercise sheet. Unofficial practice material. Part I is scored here at 0.5 per statement handled correctly
        (ticked if true, left blank if false).
      </p>
    </main>
  );
}
