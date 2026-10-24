import type { Metadata } from "next";
import M from "@/components/M";
import PrintButton from "@/components/PrintButton";
import { FORMULAS } from "@/data/formulas";

export const metadata: Metadata = { title: "Formula sheet" };

export default function FormulasPage() {
  return (
    <main className="paper formulas">
      <div className="phead">
        <span>1CS · Computability Theory</span>
        <span>Formula sheet</span>
      </div>
      <p className="focus">Conventions from the course slides, to revise before the interro.</p>
      <div className="no-print formulas-actions">
        <PrintButton />
      </div>
      <div className="refgrid">
        {FORMULAS.map((group) => (
          <section key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.items.map((item) => (
                <li key={item}>
                  <M>{item}</M>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
