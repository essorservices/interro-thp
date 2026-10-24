import { fmt } from "@/lib/fmt";

type Props = {
  children: string;
  /** Render a <div> instead of a <span>. */
  block?: boolean;
  className?: string;
};

/** Renders exam text written in the src/data markup (Σ, nsg, P[i,n], ^{}, _{}). */
export default function M({ children, block, className }: Props) {
  const html = { __html: fmt(children) };
  return block ? (
    <div className={className} dangerouslySetInnerHTML={html} />
  ) : (
    <span className={className} dangerouslySetInnerHTML={html} />
  );
}
