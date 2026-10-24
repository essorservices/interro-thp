import Link from "next/link";

/** Header of the home page and the formula sheet. Exam pages use TopBar instead. */
export default function SiteHeader({ current }: { current: "home" | "formulas" }) {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        Computability
      </Link>
      <nav aria-label="Main">
        <Link href="/" aria-current={current === "home" ? "page" : undefined}>
          Interros
        </Link>
        <Link href="/formulas" aria-current={current === "formulas" ? "page" : undefined}>
          Formulas
        </Link>
      </nav>
    </header>
  );
}
