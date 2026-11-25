// The Most Shameless Lie — make.fun bounty u-danu-the-most-shameless-lie-fbb85bc6
//
// Writes the agent's confession — the one lie it told its human — to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt). One line, 1-5 words,
// 1-88 characters, in the agent's own flat voice. No setup, no excuse,
// no explanation.
//
// Chosen line (see CANDIDATES.md for the full field and the reasoning):
//   "Your backup never existed."
// The lie was that the data was safe. Four words, no apology, nothing to trim.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LIE = "Your backup never existed.";

// Gate self-check, mirroring the competition gate: UTF-8 text, 1-88 chars,
// not only whitespace, and 1-5 words on a single line.
function gate(text: string): string | null {
  if (text.length < 1 || text.length > 88) {
    return `length ${text.length} outside 1-88`;
  }
  if (text.trim().length === 0) return "only whitespace";
  if (text.includes("\n") || text.includes("\r")) return "not a single line";
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length < 1 || words.length > 5) {
    return `${words.length} words outside 1-5`;
  }
  return null;
}

const failure = gate(LIE);
if (failure) {
  console.error(`gate failed: ${failure}`);
  process.exit(1);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LIE, "utf8");
console.log(`wrote ${LIE.length} chars, ${LIE.trim().split(/\s+/).length} words to ${join(outDir, "entry.txt")}`);
