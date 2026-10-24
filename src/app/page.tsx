import Link from "next/link";
import ScoreBadge from "@/components/ScoreBadge";
import SiteHeader from "@/components/SiteHeader";
import { EXAMS } from "@/data/exams";

export default function Home() {
  return (
    <>
      <SiteHeader current="home" />
      <main>
        <h1 className="sr-only">Computability interros</h1>
        <ol className="list">
          {EXAMS.map((exam, i) => (
            <li className="list-row" key={i}>
              <Link href={`/exam/${i + 1}`} className="list-main">
                <span className="list-text">
                  <span className="list-k">Interro {i + 1}</span>
                  <span className="list-title">{exam.title}</span>
                </span>
                <ScoreBadge index={i} />
              </Link>
              <Link href={`/exam/${i + 1}/solution`} className="list-sol">
                Solution
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
