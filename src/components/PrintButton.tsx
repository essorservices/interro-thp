"use client";

import Icon from "./Icon";

export default function PrintButton() {
  return (
    <button type="button" className="icon-btn" aria-label="Print or save as PDF" onClick={() => window.print()}>
      <Icon name="print" />
    </button>
  );
}
