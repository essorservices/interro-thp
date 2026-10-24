/**
 * Turns the small math markup used in src/data into HTML.
 * The input is our own static exam data, never user input.
 *
 *   Σ[i=1..x]  → big operator with limits (also Π)
 *   P[1,3]     → projection P with stacked indices
 *   nsg        → sg with an overline
 *   ^{..}      → superscript,  _{..} → subscript
 */
export function fmt(s: string): string {
  return s
    .replace(
      /([ΣΠ])\[([^\]]*?)\.\.([^\]]*?)\]/g,
      (_m, op: string, lo: string, hi: string) =>
        `<span class="bo"><span class="lim">${hi}</span><span class="sym">${op}</span><span class="lim">${lo}</span></span>`,
    )
    .replace(/P\[(\w+),(\w+)\]/g, 'P<span class="ss"><span>$2</span><span>$1</span></span>')
    .replace(/\bnsg\b/g, '<span class="ov">sg</span>')
    .replace(/\^\{([^}]*)\}/g, "<sup>$1</sup>")
    .replace(/_\{([^}]*)\}/g, "<sub>$1</sub>");
}
