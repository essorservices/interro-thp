import type { StatementId } from "./statements";

/*
 * The ten mock papers. Same format as the 2025 interro:
 * Part I  = 20 statements, tick the true ones (0.5 pt each here).
 * Part II = 5 short-answer questions, 2 pts each.
 * Text uses the markup described in src/data/statements.ts.
 */

export type Question = {
  q: string;
  /** Turing machine program shown under the question, one quadruple per line. */
  code?: string;
  /** Model answer, as it would go in the answer box. */
  a: string;
  /** Worked solution, one step per item. */
  steps: string[];
  /** A numeric check of the answer on small values. */
  check: string;
};

export type Exam = {
  focus: string;
  /** Show the Turing machine reminder above Part II. */
  tm?: boolean;
  p1: StatementId[];
  p2: Question[];
};

export const RECALL = `<b>Recall:</b> Car(x) = 0 if x ∈ E, 1 otherwise. &nbsp;r(a, b) = remainder of b divided by a. &nbsp;⌊ ⌋ = integer part.`;
export const TM_RECALL = `<b>TM:</b> alphabet {0, |, *}. The integer n is written as n+1 bars, * separates the arguments, 0 is the blank. The head starts on the leftmost bar. Instructions: q<sub>i</sub> S<sub>j</sub> action q<sub>r</sub> (G = left, D = right).`;

const ADDER = `q₀ | D q₀
q₀ * | q₁
q₁ | G q₁
q₁ 0 D q₂
q₂ | 0 q₂
q₂ 0 D q₃
q₃ | 0 q₃
q₃ 0 D q₄`;

export const EXAMS: Exam[] = [
  // ------------------------------------------------------------------ 1
  {
    focus: "Warm-up · 2025 format",
    p1: ["p2", "c3", "p6", "c16", "s11", "p18", "s6", "s1", "p36", "s5", "c19", "c24", "s20", "t2", "g2", "s12", "s13", "p4", "p21", "t8"],
    p2: [
      {
        q: `Which set E has Car_{E}(x) = sg(|⌊log₂ x⌋ − i|) as characteristic function? (x ≥ 1, i a constant)`,
        a: `E = {x | 2^{i} ≤ x &lt; 2^{i+1}}`,
        steps: [
          `Car_{E}(x) = 0 exactly when x ∈ E, and sg(…) = 0 exactly when its argument is 0.`,
          `So x ∈ E ⇔ |⌊log₂ x⌋ − i| = 0 ⇔ ⌊log₂ x⌋ = i.`,
          `⌊log₂ x⌋ = i means i ≤ log₂ x &lt; i + 1, that is 2^{i} ≤ x &lt; 2^{i+1}.`,
          `Same idea as 2025 question 1, where sg(|⌊√x⌋ − i|) gave {x | i² ≤ x &lt; (i+1)²}.`,
        ],
        check: `i = 2 gives E = {4, 5, 6, 7}. x = 6: ⌊log₂ 6⌋ = 2, Car = sg(0) = 0 ✓. x = 8: ⌊log₂ 8⌋ = 3, Car = sg(1) = 1 ✓.`,
      },
      {
        q: `What value is returned by f(x, y) = Σ[i=1..x] nsg(i ∸ y)?`,
        a: `f(x, y) = min(x, y)`,
        steps: [
          `Look at one term: nsg(i ∸ y) = 1 ⇔ i ∸ y = 0 ⇔ i ≤ y. Otherwise the term is 0.`,
          `So the sum counts the integers i between 1 and x such that i ≤ y.`,
          `If x ≤ y, every i = 1, …, x counts: x terms. If x &gt; y, only i = 1, …, y count: y terms.`,
          `In both cases the result is min(x, y).`,
        ],
        check: `f(5, 3): i = 1, 2, 3 give 1 and i = 4, 5 give 0, so f = 3 = min(5, 3) ✓. f(2, 7) = 2 ✓.`,
      },
      {
        q: `Give the characteristic function of the set E = {x | f(x) ≠ k} (f is recursive and k is a constant).`,
        a: `Car_{E}(x) = nsg(|f(x) − k|)`,
        steps: [
          `We need a function that is 0 when f(x) ≠ k and 1 when f(x) = k.`,
          `|f(x) − k| is 0 when f(x) = k, and ≥ 1 when f(x) ≠ k.`,
          `nsg turns 0 into 1 and anything ≥ 1 into 0, so nsg(|f(x) − k|) is exactly what we want.`,
          `It is recursive: a composition of recursive functions (f, |·|, nsg). Compare with 2025 question 3: {x | f(x) = k} has Car = sg(|f(x) − k|).`,
        ],
        check: `f(x) = x², k = 4. x = 2: nsg(0) = 1, so 2 ∉ E ✓ (f(2) = 4). x = 3: nsg(5) = 0, so 3 ∈ E ✓.`,
      },
      {
        q: `Which function is defined by: f(0) = 0, f(y+1) = nsg(f(y))?`,
        a: `f(y) = r(2, y): 0 if y is even, 1 if y is odd`,
        steps: [
          `Compute the first values: f(0) = 0, f(1) = nsg(0) = 1, f(2) = nsg(1) = 0, f(3) = nsg(0) = 1, …`,
          `The value flips at every step, so f(y) = 0 for even y and 1 for odd y.`,
          `That is the remainder of y divided by 2: f(y) = r(2, y).`,
          `In the recursion scheme (n = 0): f(0) = 0 and h(y, f(y)) = nsg∘P[2,2](y, f(y)).`,
        ],
        check: `f(4) = 0 and f(7) = 1 ✓.`,
      },
      {
        q: `Car_{E} is the characteristic function of E. Give the characteristic function of the complement Eᶜ.`,
        a: `Car_{Eᶜ}(x) = 1 ∸ Car_{E}(x) &nbsp;(= nsg(Car_{E}(x)))`,
        steps: [
          `x ∈ Eᶜ ⇔ x ∉ E ⇔ Car_{E}(x) = 1.`,
          `We need 0 where Car_{E} is 1 and 1 where Car_{E} is 0: swap 0 and 1.`,
          `1 ∸ Car_{E}(x) does it: 1 ∸ 1 = 0 and 1 ∸ 0 = 1. nsg(Car_{E}(x)) does the same thing.`,
          `This proves the course theorem: the complement of a recursive (PR) set is recursive (PR).`,
        ],
        check: `E = the even numbers, Car_{E}(x) = r(2, x). Car_{Eᶜ}(3) = 1 ∸ 1 = 0, so 3 ∈ Eᶜ (odd) ✓.`,
      },
    ],
  },
  // ------------------------------------------------------------------ 2
  {
    focus: "Characteristic functions",
    p1: ["p1", "c13", "p7", "s16", "p20", "c10", "s17", "t9", "p10", "p11", "s22", "c21", "p34", "s24", "t6", "g4", "s9", "p14", "c17", "s34"],
    p2: [
      {
        q: `Which set E has Car_{E}(x) = sg(|x − ⌊√x⌋²|) as characteristic function?`,
        a: `E = {n² | n ∈ ℕ}, the perfect squares`,
        steps: [
          `Car_{E}(x) = 0 ⇔ |x − ⌊√x⌋²| = 0 ⇔ x = ⌊√x⌋².`,
          `If x = n², then ⌊√x⌋ = n and ⌊√x⌋² = x.`,
          `If x is not a perfect square, then ⌊√x⌋² &lt; x.`,
          `So E is the set of perfect squares {0, 1, 4, 9, 16, …}.`,
        ],
        check: `x = 9: ⌊√9⌋² = 9, Car = 0 ✓. x = 10: ⌊√10⌋² = 9, Car = sg(1) = 1 ✓.`,
      },
      {
        q: `What value is returned by f(x) = Σ[i=1..x] nsg(r(i, x))?`,
        a: `The number of divisors of x (and f(0) = 0)`,
        steps: [
          `r(i, x) is the remainder of x divided by i. It is 0 ⇔ i divides x.`,
          `So nsg(r(i, x)) = 1 if i divides x, and 0 otherwise.`,
          `Summing over i = 1 … x counts the divisors of x between 1 and x, which is all of them.`,
          `For x = 0 the sum is empty, so f(0) = 0. This is the function n(x) of TD exercise 1.6.`,
        ],
        check: `f(12): the divisors are 1, 2, 3, 4, 6, 12, so f = 6 ✓. f(7) = 2 (7 is prime) ✓.`,
      },
      {
        q: `n(x) is the number of divisors of x (it is primitive recursive). Give the characteristic function of the set P of prime numbers.`,
        a: `Car_{P}(x) = sg(|n(x) − 2|)`,
        steps: [
          `x is prime ⇔ x has exactly two divisors (1 and x) ⇔ n(x) = 2.`,
          `Car_{P}(x) must be 0 ⇔ n(x) = 2: the "equals a constant" pattern sg(|… − 2|).`,
          `0 and 1 are not prime and are excluded on their own: n(0) = 0 and n(1) = 1.`,
          `n is PR, so Car_{P} is PR: the set of primes is primitive recursive.`,
        ],
        check: `x = 7: n = 2, Car = 0 ✓. x = 9: n = 3, Car = 1 ✓. x = 1: n = 1, Car = 1 ✓.`,
      },
      {
        q: `Give the characteristic function of E₁ ∪ E₂ in terms of Car_{E₁} and Car_{E₂}.`,
        a: `Car_{E₁∪E₂}(x) = Car_{E₁}(x) × Car_{E₂}(x)`,
        steps: [
          `x ∈ E₁ ∪ E₂ ⇔ x ∈ E₁ or x ∈ E₂ ⇔ Car_{E₁}(x) = 0 or Car_{E₂}(x) = 0.`,
          `A product of natural numbers is 0 ⇔ at least one factor is 0.`,
          `So Car_{E₁}(x) × Car_{E₂}(x) is 0 exactly on E₁ ∪ E₂, and 1 × 1 = 1 everywhere else.`,
        ],
        check: `E₁ = evens, E₂ = multiples of 3. x = 9: 1 × 0 = 0 ✓ (9 ∈ E₂). x = 5: 1 × 1 = 1 ✓.`,
      },
      {
        q: `Give the characteristic function of E₁ ∩ E₂ in terms of Car_{E₁} and Car_{E₂}.`,
        a: `Car_{E₁∩E₂}(x) = sg(Car_{E₁}(x) + Car_{E₂}(x))`,
        steps: [
          `x ∈ E₁ ∩ E₂ ⇔ Car_{E₁}(x) = 0 and Car_{E₂}(x) = 0.`,
          `A sum of natural numbers is 0 ⇔ every term is 0.`,
          `The sum can reach 2, so apply sg to bring it back into {0, 1}.`,
          `Other correct answers: max(Car_{E₁}(x), Car_{E₂}(x)), or Car_{E₁}(x) + Car_{E₂}(x) ∸ Car_{E₁}(x) × Car_{E₂}(x).`,
        ],
        check: `E₁ = evens, E₂ = multiples of 3. x = 6: sg(0 + 0) = 0 ✓. x = 4: sg(0 + 1) = 1 ✓.`,
      },
    ],
  },
  // ------------------------------------------------------------------ 3
  {
    focus: "Sums, μ and recursion",
    p1: ["p3", "c5", "p19", "s3", "c9", "p26", "s21", "t1", "s4", "p30", "c20", "s18", "t12", "p15", "s40", "p31", "c18", "s33", "h1", "p40"],
    p2: [
      {
        q: `Which set E has Car_{E}(x) = sg(r(2, x) + r(3, x)) as characteristic function?`,
        a: `E = the multiples of 6`,
        steps: [
          `Car = 0 ⇔ r(2, x) + r(3, x) = 0 ⇔ r(2, x) = 0 and r(3, x) = 0.`,
          `So x is divisible by 2 and by 3.`,
          `2 and 3 are coprime, so this means 6 divides x.`,
          `The sum can be as large as 3, which is why sg is applied.`,
        ],
        check: `x = 12: 0 + 0, Car = 0 ✓. x = 9: 1 + 0, Car = 1 ✓.`,
      },
      {
        q: `What value is returned by f(x, y) = Σ[i=1..x] sg(i ∸ y)?`,
        a: `f(x, y) = x ∸ y`,
        steps: [
          `sg(i ∸ y) = 1 ⇔ i ∸ y ≥ 1 ⇔ i &gt; y.`,
          `The sum counts the i ∈ [1, x] with i &gt; y, which are y + 1, y + 2, …, x.`,
          `If x &gt; y there are x − y of them, and if x ≤ y there are none.`,
          `That is exactly x ∸ y.`,
        ],
        check: `f(7, 3): i = 4, 5, 6, 7 count, so f = 4 = 7 − 3 ✓. f(2, 5) = 0 ✓.`,
      },
      {
        q: `Give the characteristic function of E = {x | f(x) &gt; g(x)} (f and g are recursive).`,
        a: `Car_{E}(x) = nsg(f(x) ∸ g(x))`,
        steps: [
          `f(x) &gt; g(x) ⇔ f(x) ∸ g(x) ≥ 1. When f(x) ≤ g(x), f(x) ∸ g(x) = 0.`,
          `We need 0 in the first case and 1 in the second: nsg(f(x) ∸ g(x)).`,
          `This is the course's Car_{&gt;}(x, y) = nsg(x ∸ y) with f(x) and g(x) plugged in.`,
        ],
        check: `f(x) = 2x, g(x) = x + 3. x = 5: 10 ∸ 8 = 2, nsg = 0, so 5 ∈ E ✓. x = 1: 2 ∸ 4 = 0, nsg = 1, so 1 ∉ E ✓.`,
      },
      {
        q: `What does f(x) = μ_{y}(nsg((y+1)² ∸ x) = 0) compute? Is it total?`,
        a: `f(x) = ⌊√x⌋, and it is total`,
        steps: [
          `nsg((y+1)² ∸ x) = 0 ⇔ (y+1)² ∸ x ≥ 1 ⇔ (y+1)² &gt; x.`,
          `μ returns the smallest y with (y+1)² &gt; x. For that y, the value y − 1 failed, so y² ≤ x (or y = 0).`,
          `So y² ≤ x &lt; (y+1)², which is the definition of y = ⌊√x⌋.`,
          `Total: the condition always becomes true (at the latest for y = x), so the search always stops.`,
        ],
        check: `x = 10: y = 0, 1, 2 give 1, 4, 9 ≤ 10 (no); y = 3 gives 16 &gt; 10 (yes), so f(10) = 3 = ⌊√10⌋ ✓.`,
      },
      {
        q: `Which function is defined by: f(0) = 0, f(y+1) = f(y) + 2y + 1?`,
        a: `f(y) = y²`,
        steps: [
          `Compute values: f(0) = 0, f(1) = 0 + 1 = 1, f(2) = 1 + 3 = 4, f(3) = 4 + 5 = 9, f(4) = 9 + 7 = 16.`,
          `Guess f(y) = y² and prove it by induction: f(0) = 0 = 0², and if f(y) = y² then f(y+1) = y² + 2y + 1 = (y+1)².`,
          `This is the recursion scheme with n = 0: f(0) = constant, f(y+1) = h(y, f(y)) with h(y, z) = z + 2y + 1, which is PR.`,
        ],
        check: `f(5) = f(4) + 2·4 + 1 = 16 + 9 = 25 = 5² ✓.`,
      },
    ],
  },
  // ------------------------------------------------------------------ 4
  {
    focus: "Minimization",
    p1: ["p24", "c1", "s7", "p17", "s15", "c22", "p33", "t3", "s25", "p38", "s28", "g3", "p9", "s44", "c8", "p41", "s10", "t16", "p35", "s14"],
    p2: [
      {
        q: `Which relation E has Car_{E}(x, y) = sg(x ∸ y) as characteristic function?`,
        a: `E = {(x, y) | x ≤ y}`,
        steps: [
          `Car = 0 ⇔ sg(x ∸ y) = 0 ⇔ x ∸ y = 0.`,
          `x ∸ y = 0 ⇔ x ≤ y (when x ≤ y the truncated subtraction gives 0).`,
          `So E = {(x, y) | x ≤ y}. Equality is included: it is not x &lt; y.`,
        ],
        check: `(3, 3): 3 ∸ 3 = 0, Car = 0, in E ✓. (4, 3): 4 ∸ 3 = 1, Car = 1, not in E ✓.`,
      },
      {
        q: `What does f(x, y) = μ_{z}((x ∸ z) + (y ∸ z) = 0) compute?`,
        a: `f(x, y) = max(x, y) (total)`,
        steps: [
          `(x ∸ z) + (y ∸ z) = 0 ⇔ x ∸ z = 0 and y ∸ z = 0 ⇔ z ≥ x and z ≥ y.`,
          `The smallest z with z ≥ x and z ≥ y is max(x, y).`,
          `The search always stops (z = max(x, y) works), so f is total: max is recursive (TD exercise 2.1).`,
          `Compare with the course: min(x, y) = μ_{z}((x ∸ z) × (y ∸ z) = 0), with a product instead of a sum.`,
        ],
        check: `f(3, 5): z = 0 … 4 give a non-zero sum and z = 5 gives 0 + 0, so f = 5 ✓.`,
      },
      {
        q: `What does g(x, y) = μ_{z}(|x × z − y| = 0) compute? Where is it defined?`,
        a: `g(x, y) = y / x when x divides y (and g(0, 0) = 0). It is undefined otherwise, so g is partial recursive.`,
        steps: [
          `|x·z − y| = 0 ⇔ x·z = y, and μ returns the smallest such z.`,
          `If x &gt; 0 and x divides y, the only solution is z = y / x.`,
          `If x &gt; 0 and x does not divide y, there is no solution, so g is undefined.`,
          `If x = 0, then x·z = 0: a solution exists only for y = 0 (z = 0). g(0, y) is undefined for y &gt; 0.`,
          `g is not total, so it is partial recursive but not recursive.`,
        ],
        check: `g(3, 12) = 4 ✓. g(3, 10): 3·z never equals 10, so g(3, 10) is undefined ✓.`,
      },
      {
        q: `Give the characteristic function of E = {x | x ≥ 10}.`,
        a: `Car_{E}(x) = sg(10 ∸ x) &nbsp;(or nsg(x ∸ 9))`,
        steps: [
          `We need 0 when x ≥ 10 and 1 when x ≤ 9.`,
          `10 ∸ x = 0 ⇔ x ≥ 10, and 10 ∸ x ≥ 1 otherwise. Applying sg gives exactly 0 / 1.`,
          `Another form: x ≥ 10 ⇔ x &gt; 9 ⇔ x ∸ 9 ≥ 1, so nsg(x ∸ 9) works too.`,
        ],
        check: `x = 10: sg(0) = 0 ✓. x = 7: sg(3) = 1 ✓.`,
      },
      {
        q: `What is the domain of f(x) = μ_{y}(x + y + 1 = 0)?`,
        a: `The empty set: f is undefined for every x`,
        steps: [
          `g(x, y) = x + y + 1 is total, but g(x, y) ≥ 1 for every x and y.`,
          `μ_{y} looks for a y with g(x, y) = 0, testing y = 0, 1, 2, … forever.`,
          `So f(x) is undefined for every x: its domain is ∅.`,
          `Lesson (course, slide 46): if g never reaches 0, μ is undefined even when g is total.`,
        ],
        check: `x = 0: g(0, y) = 1, 2, 3, … is never 0 ✓.`,
      },
    ],
  },
  // ------------------------------------------------------------------ 5
  {
    focus: "Turing machines",
    tm: true,
    p1: ["p4", "c12", "p16", "s5", "s36", "c6", "p29", "s41", "t5", "p44", "s30", "c14", "p23", "g5", "s43", "t14", "p45", "s26", "h5", "c11"],
    p2: [
      {
        q: `Which set E has Car_{E}(x) = nsg(r(2, x)) as characteristic function?`,
        a: `E = the odd numbers`,
        steps: [
          `Car = 0 ⇔ nsg(r(2, x)) = 0 ⇔ r(2, x) ≠ 0 ⇔ r(2, x) = 1.`,
          `So x is odd.`,
          `By contrast, Car of the even numbers is simply r(2, x) (course, slide 53).`,
        ],
        check: `x = 5: r = 1, nsg(1) = 0, so 5 ∈ E ✓. x = 4: r = 0, nsg(0) = 1, so 4 ∉ E ✓.`,
      },
      {
        q: `Write the initial tape for the input (x, y) = (2, 0).`,
        a: `<span class="tape">|||*|</span> &nbsp;(3 bars, the separator, 1 bar)`,
        steps: [
          `The integer n is written as n + 1 bars.`,
          `2 → ||| and 0 → | (a single bar, not an empty tape).`,
          `The two arguments are separated by *, which gives |||*|.`,
        ],
        check: `3 bars − 1 = 2 and 1 bar − 1 = 0 ✓.`,
      },
      {
        q: `Which function f(x) does this TM compute?`,
        code: `q₀ | D q₀
q₀ 0 | q₁
q₁ | D q₁
q₁ 0 | q₂`,
        a: `f(x) = x + 2`,
        steps: [
          `q₀ | D q₀: move right while reading bars.`,
          `q₀ 0 | q₁: on the first blank, write a bar and go to q₁.`,
          `q₁ | D q₁: step right onto the next cell, which is blank.`,
          `q₁ 0 | q₂: write a second bar. No instruction starts with q₂, so the machine halts.`,
          `x + 1 bars plus 2 bars gives x + 3 bars, which represents x + 2.`,
        ],
        check: `Input 1 = || gives |||| = 3 = 1 + 2 ✓.`,
      },
      {
        q: `The course's addition TM below runs on the input (3, 2). How many bars are on the tape when it halts?`,
        code: ADDER,
        a: `6 bars, which represent 5`,
        steps: [
          `The input (3, 2) is written ||||*|||, that is 4 + 3 = 7 bars.`,
          `q₀ | D q₀ then q₀ * | q₁: the separator becomes a bar, so 8 bars in a row.`,
          `q₁ | G q₁ goes back to the left end, and q₁ 0 D q₂ steps onto the first bar.`,
          `q₂ | 0 q₂ erases a bar, q₂ 0 D q₃ steps right, q₃ | 0 q₃ erases a second bar, and q₃ 0 D q₄ stops (nothing starts with q₄ |).`,
          `8 − 2 = 6 bars, which represents 5 = 3 + 2.`,
        ],
        check: `General rule: (x+1) + 1 + (y+1) − 2 = x + y + 1 bars, which represents x + y ✓.`,
      },
      {
        q: `Which function f(x, y) does this TM compute?`,
        code: `q₀ | D q₀
q₀ * | q₁`,
        a: `f(x, y) = x + y + 2`,
        steps: [
          `q₀ | D q₀ moves right over the first argument.`,
          `q₀ * | q₁ replaces the separator with a bar. No instruction starts with q₁, so the machine halts.`,
          `The tape now holds (x+1) + 1 + (y+1) = x + y + 3 bars in a row.`,
          `x + y + 3 bars represent x + y + 2, not x + y.`,
          `That is why the course's adder has to erase two bars at the end.`,
        ],
        check: `(1, 1): ||*|| becomes ||||| = 4 = 1 + 1 + 2 ✓.`,
      },
    ],
  },
  // ------------------------------------------------------------------ 6
  {
    focus: "Gödel numbering",
    p1: ["p22", "c4", "p5", "s8", "p39", "c23", "s19", "t7", "p27", "s6", "g6", "p13", "s37", "c15", "t13", "p42", "s47", "s45", "p12", "h3"],
    p2: [
      {
        q: `Which set E has Car_{E}(x) = sg(|⌊x/2⌋ − i|) as characteristic function? (i a constant)`,
        a: `E = {2i, 2i + 1}`,
        steps: [
          `Car = 0 ⇔ ⌊x/2⌋ = i.`,
          `⌊x/2⌋ = i ⇔ i ≤ x/2 &lt; i + 1 ⇔ 2i ≤ x &lt; 2i + 2.`,
          `The only integers in [2i, 2i + 2) are 2i and 2i + 1.`,
        ],
        check: `i = 3 gives E = {6, 7}. x = 7: ⌊7/2⌋ = 3, Car = 0 ✓. x = 8: ⌊8/2⌋ = 4, Car = 1 ✓.`,
      },
      {
        q: `Alphabet {a, b, c} coded a → 1, b → 2, c → 3. With the course method (word c₁c₂c₃… ↦ 2^{c₁} · 3^{c₂} · 5^{c₃} · …), give the Gödel number of the word « abc ».`,
        a: `2¹ · 3² · 5³ = 2250`,
        steps: [
          `The k-th letter's code becomes the exponent of the k-th prime: 2, 3, 5, 7, …`,
          `« abc » has codes 1, 2, 3, so its number is 2¹ · 3² · 5³.`,
          `2 · 9 · 125 = 2250.`,
        ],
        check: `Decode: 2250 = 2 · 1125 = 2 · 9 · 125 = 2¹ · 3² · 5³, exponents 1, 2, 3, so « abc » ✓.`,
      },
      {
        q: `Same coding. Which word has the Gödel number 360?`,
        a: `« cba »`,
        steps: [
          `Factor 360 into primes: 360 = 8 · 45 = 2³ · 3² · 5¹.`,
          `Read the exponents in the order of the primes: 3, 2, 1.`,
          `3 → c, 2 → b, 1 → a: the word is « cba ».`,
        ],
        check: `2³ · 3² · 5 = 8 · 9 · 5 = 360 ✓.`,
      },
      {
        q: `A program P = &lt;I₀, I₁, I₂&gt; has instruction codes g₀ = 2, g₁ = 0, g₂ = 1. Give its Gödel number with the course formula 2^{g₀+1} · 3^{g₁+1} · 5^{g₂+1}.`,
        a: `2³ · 3¹ · 5² = 600`,
        steps: [
          `Add 1 to each instruction code: 2 + 1 = 3, 0 + 1 = 1, 1 + 1 = 2.`,
          `Gödel number = 2³ · 3¹ · 5² = 8 · 3 · 25 = 600.`,
          `Why the +1: without it, I₁ (code 0) would give 3⁰ = 1, the factor 3 would vanish, and we could not tell that P has three instructions.`,
        ],
        check: `Decode: 600 = 2³ · 3 · 5², exponents 3, 1, 2, minus 1 gives 2, 0, 1 ✓.`,
      },
      {
        q: `Which function is defined by: f(x, 0) = 1, f(x, y+1) = x × f(x, y)?`,
        a: `f(x, y) = x^{y}`,
        steps: [
          `f(x, 0) = 1 = x⁰.`,
          `Each step multiplies by x: f(x, 1) = x, f(x, 2) = x², …`,
          `Induction: if f(x, y) = x^{y}, then f(x, y+1) = x · x^{y} = x^{y+1}.`,
          `In the scheme: g(x) = S∘Z(x) = 1 and h = *(P[1,3], P[3,3]). So pow is PR (TD exercise 1.1.5).`,
        ],
        check: `f(2, 3) = 2 · 2 · 2 · 1 = 8 = 2³ ✓.`,
      },
    ],
  },
  // ------------------------------------------------------------------ 7
  {
    focus: "Hard mode",
    p1: ["p14", "c19", "p25", "s16", "c22", "p37", "s9", "t4", "p33", "s22", "c2", "p8", "s35", "t11", "s11", "p30", "s32", "c10", "p46", "h2"],
    p2: [
      {
        q: `Which set E has Car_{E}(x) = Π[i=0..x] sg(|i³ − x|) as characteristic function?`,
        a: `E = {n³ | n ∈ ℕ}, the perfect cubes`,
        steps: [
          `A product is 0 ⇔ one of its factors is 0.`,
          `The factor for i is sg(|i³ − x|), which is 0 ⇔ i³ = x.`,
          `So Car = 0 ⇔ there is an i ∈ [0, x] with i³ = x.`,
          `If x = n³ then n ≤ x, so the bound i ≤ x loses nothing: E is the set of perfect cubes.`,
          `General pattern: "∃ i ≤ x such that P(i)" ↔ Π[i=0..x] Car_{P}(i) (bounded quantification).`,
        ],
        check: `x = 8: i = 2 gives 2³ = 8, a factor is 0, Car = 0 ✓. x = 9: no i works, all factors are 1, Car = 1 ✓.`,
      },
      {
        q: `What value is returned by f(x) = Σ[i=1..x] nsg(2^{i} ∸ x) (x ≥ 1)?`,
        a: `f(x) = ⌊log₂ x⌋`,
        steps: [
          `nsg(2^{i} ∸ x) = 1 ⇔ 2^{i} ∸ x = 0 ⇔ 2^{i} ≤ x.`,
          `The sum counts the i ∈ [1, x] with 2^{i} ≤ x: i = 1, 2, …, k where 2^{k} ≤ x &lt; 2^{k+1}.`,
          `There are k of them, and k = ⌊log₂ x⌋. The bound x never cuts the count short, since 2^{i} &gt; i.`,
        ],
        check: `x = 10: 2, 4, 8 ≤ 10 but 16 &gt; 10, so f = 3 = ⌊log₂ 10⌋ ✓. x = 1: no term, f = 0 = log₂ 1 ✓.`,
      },
      {
        q: `f is a strictly increasing recursive function and F = {f(0), f(1), f(2), …} is its range. Give Car_{F}.`,
        a: `Car_{F}(x) = Π[i=0..x] sg(|f(i) − x|)`,
        steps: [
          `x ∈ F ⇔ there is an i with f(i) = x. We need to bound the search over i.`,
          `f strictly increasing ⇒ f(i) ≥ i for every i (induction: f(0) ≥ 0 and f(i+1) &gt; f(i) ≥ i).`,
          `So if f(i) = x then i ≤ f(i) = x: looking at i ∈ [0, x] is enough.`,
          `Bounded ∃ written as a product: Car_{F}(x) = Π[i=0..x] sg(|f(i) − x|).`,
          `It is recursive (PR if f is PR): TD exercise 4.1.`,
        ],
        check: `f(i) = 2i + 1 (the odd numbers). x = 5: i = 2 gives 5, Car = 0 ✓. x = 4: no i, Car = 1 ✓.`,
      },
      {
        q: `What does f(x) = μ_{y≤x}(|y × y − x| = 0) return? (bounded minimization)`,
        a: `√x if x is a perfect square, otherwise x`,
        steps: [
          `μ_{y≤x} returns the smallest y ≤ x with |y² − x| = 0, that is y² = x.`,
          `If x is a perfect square, that y is √x (and √x ≤ x).`,
          `Otherwise no y works, and bounded μ returns the bound itself, n = x (course, slide 56).`,
          `f is PR, as a bounded minimization of a PR function.`,
        ],
        check: `f(16) = 4 ✓. f(10) = 10 ✓. f(0) = 0 and f(1) = 1.`,
      },
      {
        q: `E is the domain of a partial recursive function φ. Give a semi-characteristic function of E.`,
        a: `Z(φ(x)): 0 if φ(x) is defined, undefined otherwise`,
        steps: [
          `Semi-characteristic function: 0 if x ∈ E, undefined otherwise (course, slide 52).`,
          `E = dom(φ), so x ∈ E ⇔ φ(x) is defined.`,
          `Take Z(φ(x)): if φ(x) is defined, Z returns 0. If φ(x) is undefined, the composition is undefined too.`,
          `Z∘φ is partial recursive (composition), so E is semi-decidable. This is why RE ⇔ semi-decidable.`,
        ],
        check: `φ(x) = μ_{z}(|x + z − 5| = 0) has domain {0, …, 5}. Z(φ(3)) = 0 ✓, and Z(φ(7)) is undefined ✓.`,
      },
    ],
  },
  // ------------------------------------------------------------------ 8
  {
    focus: "Composition & recursion schemes",
    p1: ["p1", "c7", "p48", "s1", "s20", "c13", "p6", "s12", "t10", "s18", "p43", "g1", "s29", "p18", "c3", "s39", "t17", "p32", "h6", "s46"],
    p2: [
      {
        q: `Which relation E has Car_{E}(x, y) = sg(x ∸ y) + sg(y ∸ x) as characteristic function?`,
        a: `E = {(x, y) | x = y}`,
        steps: [
          `The sum is 0 ⇔ both terms are 0.`,
          `sg(x ∸ y) = 0 ⇔ x ≤ y, and sg(y ∸ x) = 0 ⇔ y ≤ x.`,
          `Both together ⇔ x = y. The two terms are never 1 at the same time, so the sum stays in {0, 1}.`,
          `It is the same function as the course's Car_{=}(x, y) = sg|x − y|.`,
        ],
        check: `(4, 4): 0 + 0 = 0 ✓. (4, 6): 0 + 1 = 1 ✓. (6, 4): 1 + 0 = 1 ✓.`,
      },
      {
        q: `What value is returned by f(x) = Σ[i=1..x] i × nsg(r(i, x))?`,
        a: `The sum of the divisors of x`,
        steps: [
          `nsg(r(i, x)) = 1 ⇔ i divides x, and 0 otherwise.`,
          `So the term i × nsg(r(i, x)) is i when i is a divisor, and 0 otherwise.`,
          `The sum adds up every divisor of x between 1 and x.`,
        ],
        check: `f(6) = 1 + 2 + 3 + 6 = 12 ✓. f(7) = 1 + 7 = 8 ✓.`,
      },
      {
        q: `Express f(x, y, z) = x + z by composition, using only + and projections.`,
        a: `f = +(P[1,3], P[3,3]), i.e. f(x, y, z) = +(P[1,3](x, y, z), P[3,3](x, y, z))`,
        steps: [
          `Composition rule: f(x⃗) = h(g₁(x⃗), …, g_{m}(x⃗)), where every g_{k} has as many arguments as f.`,
          `f has 3 arguments and we need x (1st) and z (3rd): g₁ = P[1,3] and g₂ = P[3,3].`,
          `h = + (2 arguments).`,
          `So f = +(P[1,3], P[3,3]).`,
        ],
        check: `f(2, 9, 5) = +(2, 5) = 7 ✓ (y is ignored).`,
      },
      {
        q: `Write the multiplication *(x, y) with the recursion scheme: give g and h.`,
        a: `*(x, 0) = Z(x); &nbsp;*(x, y+1) = +(P[1,3], P[3,3])(x, y, *(x, y)). So g = Z and h = +(P[1,3], P[3,3]).`,
        steps: [
          `Recursion rule: f(x, 0) = g(x), f(x, y+1) = h(x, y, f(x, y)).`,
          `x × 0 = 0, so g = Z.`,
          `x × (y+1) = x × y + x = +(x, x × y).`,
          `h receives (x, y, x × y) and must return x + (x × y): it adds its 1st and 3rd arguments, so h = +(P[1,3], P[3,3]).`,
          `This is example 3.5 of the course (slide 41).`,
        ],
        check: `*(3, 2) = +(3, *(3, 1)) = +(3, +(3, *(3, 0))) = 3 + 3 + 0 = 6 ✓.`,
      },
      {
        q: `Ackermann: A(0, n) = n + 1, A(m, 0) = A(m − 1, 1), A(m, n) = A(m − 1, A(m, n − 1)). Compute A(2, 1).`,
        a: `A(2, 1) = 5`,
        steps: [
          `First A(1, n): A(1, 0) = A(0, 1) = 2, and A(1, n) = A(0, A(1, n − 1)) = A(1, n − 1) + 1. So A(1, n) = n + 2.`,
          `A(2, 0) = A(1, 1) = 3.`,
          `A(2, 1) = A(1, A(2, 0)) = A(1, 3) = 5.`,
          `More generally A(2, n) = 2n + 3 and A(3, n) = 2^{n+3} − 3: the growth explodes as m increases.`,
        ],
        check: `A(2, 2) = A(1, A(2, 1)) = A(1, 5) = 7 = 2·2 + 3 ✓.`,
      },
    ],
  },
  // ------------------------------------------------------------------ 9
  {
    focus: "Mixed",
    tm: true,
    p1: ["p2", "c24", "p21", "s17", "p47", "c11", "s31", "t18", "s13", "p19", "c21", "s38", "t15", "p11", "g2", "s23", "p26", "c17", "h7", "s4"],
    p2: [
      {
        q: `Which set E has Car_{E}(x) = nsg(x ∸ 5) as characteristic function?`,
        a: `E = {x | x &gt; 5} = {6, 7, 8, …}`,
        steps: [
          `Car = 0 ⇔ nsg(x ∸ 5) = 0 ⇔ x ∸ 5 ≥ 1 ⇔ x &gt; 5.`,
          `For x ≤ 5: x ∸ 5 = 0, nsg(0) = 1, so x ∉ E.`,
          `So E = {6, 7, 8, …}.`,
        ],
        check: `x = 6: nsg(1) = 0 ✓. x = 5: nsg(0) = 1 ✓.`,
      },
      {
        q: `What value is returned by f(x, y) = Σ[i=1..x] nsg(r(y, i)) (y &gt; 0)?`,
        a: `f(x, y) = ⌊x / y⌋ (integer division)`,
        steps: [
          `r(y, i) is the remainder of i divided by y, so nsg(r(y, i)) = 1 ⇔ y divides i.`,
          `The sum counts the multiples of y in [1, x]: y, 2y, 3y, …, ky with ky ≤ x.`,
          `The largest such k is ⌊x / y⌋.`,
          `Compare with the 2025 formula Σ[i=1..x] nsg(i·y ∸ x), which also gives x / y.`,
        ],
        check: `f(10, 3): the multiples are 3, 6, 9, so f = 3 = ⌊10/3⌋ ✓.`,
      },
      {
        q: `Give the characteristic function of E = {(x, y, z) | x + y = z}.`,
        a: `Car_{E}(x, y, z) = sg(|x + y − z|)`,
        steps: [
          `Use the equality pattern: a = b ⇔ |a − b| = 0.`,
          `Here a = x + y and b = z, so Car_{E}(x, y, z) = sg(|x + y − z|).`,
          `It is a composition of PR functions, so E is PR.`,
        ],
        check: `(2, 3, 5): sg(0) = 0 ✓. (2, 3, 6): sg(1) = 1 ✓.`,
      },
      {
        q: `Give the characteristic function of the finite set {a, b}.`,
        a: `Car(x) = sg(|x − a|) × sg(|x − b|) &nbsp;(or sg(|x − a| × |x − b|))`,
        steps: [
          `{a, b} = {a} ∪ {b}.`,
          `The singleton {a} has characteristic function sg(|x − a|), and {b} has sg(|x − b|).`,
          `Union = product: sg(|x − a|) × sg(|x − b|).`,
          `sg(|x − a| × |x − b|) is also correct, since the product is 0 ⇔ x = a or x = b.`,
        ],
        check: `a = 2, b = 5. x = 5: 1 × 0 = 0 ✓. x = 3: 1 × 1 = 1 ✓.`,
      },
      {
        q: `Which function f(x) does this TM compute?`,
        code: `q₀ | 0 q₁
q₁ 0 D q₂
q₂ 0 | q₃`,
        a: `f(x) = Pr(x), the predecessor (x − 1 if x &gt; 0, 0 otherwise)`,
        steps: [
          `q₀ | 0 q₁ erases the first bar, and q₁ 0 D q₂ steps right.`,
          `If x &gt; 0, the head is now on a bar. No instruction starts with q₂ |, so it halts with x bars, which represents x − 1.`,
          `If x = 0, the tape is now empty and the head is on a blank: q₂ 0 | q₃ writes one bar back (= 0), then it halts since nothing starts with q₃.`,
          `So f(x) = Pr(x): x − 1 if x &gt; 0, and 0 if x = 0.`,
        ],
        check: `x = 3 (||||) gives ||| = 2 ✓. x = 0 (|) gives | = 0 ✓.`,
      },
    ],
  },
  // ------------------------------------------------------------------ 10
  {
    focus: "2025 remix",
    p1: ["p16", "c5", "s9", "p24", "c20", "s36", "p20", "s22", "c18", "p33", "s10", "t19", "s27", "p34", "c14", "s42", "p28", "t12", "h8", "s44"],
    p2: [
      {
        q: `Give the characteristic function of E = {x | i² ≤ x &lt; (i+1)²} (i a constant).`,
        a: `Car_{E}(x) = sg(|⌊√x⌋ − i|)`,
        steps: [
          `x ∈ E ⇔ i² ≤ x &lt; (i+1)² ⇔ ⌊√x⌋ = i.`,
          `Equality to a constant gives sg(|⌊√x⌋ − i|).`,
          `This is 2025 Part II question 1, asked the other way round.`,
        ],
        check: `i = 2 gives E = {4, …, 8}. x = 8: ⌊√8⌋ = 2, Car = 0 ✓. x = 9: ⌊√9⌋ = 3, Car = 1 ✓.`,
      },
      {
        q: `What value is returned by f(x, y) = Σ[i=1..x] nsg(r(i, x)) × nsg(r(i, y))?`,
        a: `The number of common divisors of x and y`,
        steps: [
          `nsg(r(i, x)) = 1 ⇔ i divides x, and nsg(r(i, y)) = 1 ⇔ i divides y.`,
          `The product is 1 ⇔ both hold ⇔ i is a common divisor of x and y.`,
          `The sum counts the common divisors in [1, x]. That is all of them, since a divisor of x is at most x.`,
        ],
        check: `f(12, 18): the common divisors are 1, 2, 3, 6, so f = 4 ✓.`,
      },
      {
        q: `Give the characteristic function of E = {x | f(x) ≤ g(x)} (f and g are recursive).`,
        a: `Car_{E}(x) = sg(f(x) ∸ g(x))`,
        steps: [
          `f(x) ≤ g(x) ⇔ f(x) ∸ g(x) = 0.`,
          `If f(x) &gt; g(x), then f(x) ∸ g(x) ≥ 1.`,
          `sg brings this into {0, 1}: Car_{E}(x) = sg(f(x) ∸ g(x)).`,
        ],
        check: `f(x) = x, g(x) = 4. x = 3: sg(0) = 0 ✓. x = 6: sg(2) = 1 ✓.`,
      },
      {
        q: `Which set E has Car_{E}(x) = sg(x) + nsg(x) as characteristic function?`,
        a: `E = ∅`,
        steps: [
          `For every x, exactly one of sg(x) and nsg(x) is 1 and the other is 0.`,
          `So sg(x) + nsg(x) = 1 for every x.`,
          `Car_{E}(x) = 1 everywhere means that no x is in E: E = ∅.`,
          `In other words Car_{∅}(x) = 1, which was 2025 Part II question 4.`,
        ],
        check: `x = 0: 0 + 1 = 1. x = 7: 1 + 0 = 1 ✓.`,
      },
      {
        q: `Which set E has Car_{E}(x) = sg(x) × nsg(x) as characteristic function?`,
        a: `E = ℕ`,
        steps: [
          `For every x, one of sg(x) and nsg(x) is 0.`,
          `So sg(x) × nsg(x) = 0 for every x.`,
          `Car_{E}(x) = 0 everywhere means that every x is in E: E = ℕ.`,
          `In other words Car_{ℕ}(x) = 0, which was 2025 Part II question 5.`,
        ],
        check: `x = 0: 0 × 1 = 0. x = 4: 1 × 0 = 0 ✓.`,
      },
    ],
  },
];

/** "3" → 2, anything that is not a paper number → null. */
export function parseExamId(id: string): number | null {
  const n = Number(id);
  return Number.isInteger(n) && n >= 1 && n <= EXAMS.length ? n - 1 : null;
}
