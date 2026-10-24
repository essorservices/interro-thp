import type { Metadata } from "next";
import M from "@/components/M";
import SiteHeader from "@/components/SiteHeader";
import { FORMULAS } from "@/data/formulas";

export const metadata: Metadata = { title: "Formulas" };

export default function FormulasPage() {
  return (
    <>
      <SiteHeader current="formulas" />
      <main className="sheet">
        <h1 className="sheet-title">Formulas</h1>
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
    </>
  );
}
