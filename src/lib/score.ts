import { EXAMS } from "@/data/exams";
import { STATEMENTS } from "@/data/statements";
import type { Progress } from "./progress";

/** Part I: 0.5 per statement handled correctly. Part II: 2 per self-marked correct answer. */
export function scoreOf(index: number, p: Progress) {
  const exam = EXAMS[index];
  let part1 = 0;
  exam.p1.forEach((id, j) => {
    if (!!p.checks[j] === STATEMENTS[id].truth) part1 += 0.5;
  });
  let part2 = 0;
  let marked = 0;
  exam.p2.forEach((_, j) => {
    const v = p.self[j];
    if (v === 1) part2 += 2;
    if (v === 0 || v === 1) marked++;
  });
  return { part1, part2, marked, total: part1 + part2 };
}
