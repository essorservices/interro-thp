# Computability Mock Interros

Ten practice papers for the 1CS computability interro, in the 2025 format
(1 h · Part I: tick the true statements · Part II: 5 short answers), each with a full correction.

## Run it

```bash
npm install        # only the first time
npm run dev        # then open http://localhost:3000
```

For a faster, production version: `npm run build && npm run start`.

### On your phone

Keep the computer and the phone on the same Wi-Fi, run `npm run dev` (or `npm run build && npm run start`),
then open the **Network** address it prints, e.g. `http://192.168.100.5:3000`, in the phone's browser.
Local-network addresses are already allowed in `next.config.ts`. Answers and scores are saved separately
on each device.

## Pages

| Page | What it does |
| --- | --- |
| `/` | The 10 papers, with your last score on each. Reading theme switch (Auto / Light / Sepia / Dark) in the header. |
| `/exam/1` … `/exam/10` | Take a paper: 60-minute timer, tick boxes, answer boxes, **Correct my paper**, then self-mark Part II |
| `/exam/1/solution` … | Full correction: answer key, verdict + justification for every statement, the corrected version of every false one, and a worked solution + numeric check for every Part II question. Printable. |
| `/formulas` | Formula sheet (sg, ∸, Car, μ, recursion scheme, TM, Gödel numbering) |

Answers and scores are saved in your browser (localStorage).

## Editing the content

- `src/data/statements.ts`: Part I statement bank (`T(text, why)` / `F(text, why, correctedVersion)`).
- `src/data/exams.ts`: the 10 papers (statement ids + Part II questions with `steps` and `check`).
- `src/data/formulas.ts`: the formula sheet.

Text uses a small markup: `nsg` → sg with an overline, `Σ[i=1..x]` → sum with limits,
`P[1,3]` → projection, `^{..}` / `_{..}` → superscript / subscript.

`npm run check` validates the data (20 unique statements and 5 questions per paper, a corrected
version for every false statement, a worked solution for every question, markup that renders).
