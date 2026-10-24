// Sanity checks on the exam data. Run with `npm run check` (needs Node ≥ 23 for .ts imports).
import { EXAMS } from "../src/data/exams.ts";
import { FORMULAS } from "../src/data/formulas.ts";
import { STATEMENTS } from "../src/data/statements.ts";
import { fmt } from "../src/lib/fmt.ts";

const problems = [];
const leftover = /_\{|\^\{|[ΣΠ]\[|P\[\w+,\w+\]|\bnsg\b/;
const checkMarkup = (where, text) => {
  if (leftover.test(fmt(text))) problems.push(`${where}: markup not rendered: ${text}`);
};

for (const [id, s] of Object.entries(STATEMENTS)) {
  if (!s.truth && !s.fix) problems.push(`${id}: false statement without a corrected version`);
  if (s.truth && s.fix) problems.push(`${id}: true statement with a "fix"`);
  for (const field of ["text", "why", "fix"]) if (s[field]) checkMarkup(`${id}.${field}`, s[field]);
}

EXAMS.forEach((exam, i) => {
  const name = `Mock ${i + 1}`;
  if (exam.p1.length !== 20) problems.push(`${name}: ${exam.p1.length} statements instead of 20`);
  if (new Set(exam.p1).size !== exam.p1.length) problems.push(`${name}: duplicate statement`);
  for (const id of exam.p1) if (!STATEMENTS[id]) problems.push(`${name}: unknown statement ${id}`);
  if (exam.p2.length !== 5) problems.push(`${name}: ${exam.p2.length} questions instead of 5`);
  exam.p2.forEach((q, j) => {
    if (q.steps.length < 2) problems.push(`${name} Q${j + 1}: solution has fewer than 2 steps`);
    if (!q.check) problems.push(`${name} Q${j + 1}: no numeric check`);
    for (const text of [q.q, q.a, q.check, ...q.steps]) checkMarkup(`${name} Q${j + 1}`, text);
  });
  const trueCount = exam.p1.filter((id) => STATEMENTS[id]?.truth).length;
  console.log(`${name.padEnd(8)} ${String(trueCount).padStart(2)} true / 20   ${exam.focus}`);
});

for (const g of FORMULAS) for (const item of g.items) checkMarkup(`formulas/${g.title}`, item);

const used = new Set(EXAMS.flatMap((e) => e.p1));
console.log(`\n${used.size} distinct statements used, ${Object.keys(STATEMENTS).length} in the bank.`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log("Data OK.");
