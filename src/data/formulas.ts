/* Formula sheet: conventions from the "Calculabilité – Partie I" slides. Same markup as the statements. */

export type FormulaGroup = { title: string; items: string[] };

export const FORMULAS: FormulaGroup[] = [
  {
    title: "Basic functions",
    items: [
      `sg(x) = 0 if x = 0, 1 otherwise`,
      `nsg(x) = 1 if x = 0, 0 otherwise &nbsp;(= 1 ∸ x)`,
      `x ∸ y = x − y if x ≥ y, 0 otherwise`,
      `|x − y| = (x ∸ y) + (y ∸ x)`,
      `Base functions: Z(x) = 0, S(x) = x + 1, P[i,n](x₁, …, x<sub>n</sub>) = x<sub>i</sub>`,
    ],
  },
  {
    title: "Characteristic functions",
    items: [
      `Car_{E}(x) = 0 if x ∈ E, 1 otherwise`,
      `Semi-characteristic: 0 if x ∈ E, undefined otherwise`,
      `x = a → sg|x − a| &nbsp;· &nbsp;x ≠ a → nsg|x − a|`,
      `x &gt; y → nsg(x ∸ y) &nbsp;· &nbsp;x ≤ y → sg(x ∸ y)`,
      `even → r(2, x) &nbsp;· &nbsp;odd → nsg(r(2, x)) &nbsp;· &nbsp;k | x → sg(r(k, x))`,
      `∅ → 1 &nbsp;· &nbsp;ℕ → 0`,
    ],
  },
  {
    title: "Operations on sets",
    items: [
      `A ∪ B → Car_{A} × Car_{B}`,
      `A ∩ B → sg(Car_{A} + Car_{B})`,
      `Aᶜ → 1 ∸ Car_{A}`,
      `∃ i ≤ x such that P(i) → Π[i=0..x] Car_{P}(i)`,
      `∀ i ≤ x, P(i) → sg(Σ[i=0..x] Car_{P}(i))`,
    ],
  },
  {
    title: "Counting trick (Part II)",
    items: [
      `Σ[i=1..x] nsg(…) counts the i ∈ [1, x] where (…) = 0`,
      `Σ[i=1..x] nsg(i·y ∸ x) = ⌊x / y⌋ &nbsp;(2025)`,
      `Σ[i=1..x] nsg(r(i, x)) = number of divisors of x`,
      `Σ[i=1..x] nsg(i² ∸ x) = ⌊√x⌋`,
    ],
  },
  {
    title: "Recursion & composition",
    items: [
      `f(x⃗, 0) = g(x⃗); &nbsp;f(x⃗, y+1) = h(x⃗, y, f(x⃗, y))`,
      `g has n arguments, h has n+2, f has n+1`,
      `f(x⃗) = h(g₁(x⃗), …, g<sub>m</sub>(x⃗))`,
      `+ : f(x, 0) = P[1,1](x); &nbsp;f(x, y+1) = S∘P[3,3](x, y, f(x, y))`,
    ],
  },
  {
    title: "Minimization",
    items: [
      `μ_{y}(g(x⃗, y) = 0) = smallest y with g = 0 (all earlier values defined and ≠ 0)`,
      `Undefined if g never reaches 0, even when g is total`,
      `μ_{y≤n}: returns n when no y ≤ n works, and keeps PR`,
      `min(x, y) = μ_{z}((x ∸ z) × (y ∸ z) = 0)`,
    ],
  },
  {
    title: "Hierarchies",
    items: [
      `Functions: PR ⊂ recursive (total) ⊂ partial recursive ⊂ all ℕ^{n} → ℕ`,
      `Ackermann: recursive but not PR`,
      `Sets: PR ⊂ recursive (decidable) ⊂ RE (semi-decidable) ⊂ all subsets`,
      `E recursive ⇔ E and Eᶜ are RE`,
    ],
  },
  {
    title: "Countable vs uncountable",
    items: [
      `Countable: programs, TMs, Σ*, PR / recursive / partial recursive functions, recursive and RE sets`,
      `Uncountable: all functions ℕ → ℕ, total functions, non-computable functions, subsets of ℕ, undecidable sets`,
    ],
  },
  {
    title: "Turing machines",
    items: [
      `n = n+1 bars; * separator; 0 blank`,
      `q<sub>i</sub>S<sub>j</sub>S<sub>k</sub>q<sub>r</sub> write · q<sub>i</sub>S<sub>j</sub>Gq<sub>r</sub> left · q<sub>i</sub>S<sub>j</sub>Dq<sub>r</sub> right`,
      `Halts when no instruction starts with (state, symbol)`,
    ],
  },
  {
    title: "Gödel numbering",
    items: [
      `Word: 2^{c₁} · 3^{c₂} · 5^{c₃} · …`,
      `Program: 2^{g₀+1} · 3^{g₁+1} · 5^{g₂+1} · …`,
      `Decode: factor into primes, subtract 1 from each exponent`,
    ],
  },
];
