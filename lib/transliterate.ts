// Best-effort phonetic transliteration of a Latin-typed name into Arabic script.
// This is a heuristic, not a linguistically exact transliteration system — good
// enough for a first name shown once in a greeting. If a name doesn't come out
// right, it's easy to special-case it below (see KNOWN_NAMES).

const KNOWN_NAMES: Record<string, string> = {
  zoukari: "زوكاري",
  anwar: "أنور",
};

const DIGRAPHS: [string, string][] = [
  ["kh", "خ"], ["gh", "غ"], ["sh", "ش"], ["ch", "ش"],
  ["th", "ث"], ["ou", "و"], ["ee", "ي"], ["ay", "اي"], ["ei", "اي"],
];

const SINGLES: Record<string, string> = {
  a: "ا", b: "ب", c: "ك", d: "د", e: "ي", f: "ف", g: "ج", h: "ه",
  i: "ي", j: "ج", k: "ك", l: "ل", m: "م", n: "ن", o: "و", p: "ب",
  q: "ق", r: "ر", s: "س", t: "ت", u: "و", v: "ف", w: "و", x: "كس",
  y: "ي", z: "ز",
};

export function toArabicName(name: string): string {
  const clean = name.trim().toLowerCase();
  if (!clean) return "";
  if (KNOWN_NAMES[clean]) return KNOWN_NAMES[clean];

  let out = "";
  let i = 0;
  while (i < clean.length) {
    const two = clean.slice(i, i + 2);
    const digraph = DIGRAPHS.find(([latin]) => latin === two);
    if (digraph) {
      out += digraph[1];
      i += 2;
      continue;
    }
    const ch = clean[i];
    out += SINGLES[ch] ?? (ch === " " ? " " : "");
    i += 1;
  }
  return out;
}
