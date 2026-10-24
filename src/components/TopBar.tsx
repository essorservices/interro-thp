import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "./Icon";

type Props = {
  title: string;
  subtitle?: string;
  /** Right-hand controls (timer, print…). */
  children?: ReactNode;
  /** Stay pinned to the top while scrolling (exam page, for the timer). */
  sticky?: boolean;
};

/** One-row bar for the exam and solution pages: back · name · controls. */
export default function TopBar({ title, subtitle, children, sticky = false }: Props) {
  return (
    <div className={sticky ? "topbar sticky" : "topbar"}>
      <Link href="/" className="icon-btn" aria-label="All interros">
        <Icon name="back" size={22} />
      </Link>
      <div className="topbar-title">
        <span className="t1">{title}</span>
        {subtitle && <span className="t2">{subtitle}</span>}
      </div>
      {children && <div className="topbar-actions">{children}</div>}
    </div>
  );
}
