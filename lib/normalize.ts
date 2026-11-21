// Canonical identity + matching, per build brief section 4.

const BRAND_ALIASES: Record<string, string> = {
  ap: "Audemars Piguet",
  "audemars piguet": "Audemars Piguet",
  patek: "Patek Philippe",
  "patek philippe": "Patek Philippe",
  pp: "Patek Philippe",
  vc: "Vacheron Constantin",
  "vacheron constantin": "Vacheron Constantin",
  jlc: "Jaeger-LeCoultre",
  "jaeger lecoultre": "Jaeger-LeCoultre",
  "jaeger-lecoultre": "Jaeger-LeCoultre",
  "tag heuer": "TAG Heuer",
  tag: "TAG Heuer",
  iwc: "IWC",
  "iwc schaffhausen": "IWC",
  "a. lange & sohne": "A. Lange & Söhne",
  "a lange sohne": "A. Lange & Söhne",
  "a. lange & söhne": "A. Lange & Söhne",
  lange: "A. Lange & Söhne",
  "grand seiko": "Grand Seiko",
  gs: "Grand Seiko",
  rm: "Richard Mille",
  "richard mille": "Richard Mille",
  bvlgari: "Bulgari",
  bulgari: "Bulgari",
  "officine panerai": "Panerai",
};

export function stripDiacritics(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Canonical display brand. Unknown brands are title-cased, never dropped. */
export function normalizeBrand(raw: string): string {
  const key = stripDiacritics(raw).trim().toLowerCase().replace(/\s+/g, " ");
  if (BRAND_ALIASES[key]) return BRAND_ALIASES[key];
  const withAccents = raw.trim().toLowerCase().replace(/\s+/g, " ");
  if (BRAND_ALIASES[withAccents]) return BRAND_ALIASES[withAccents];
  return raw
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => (w.length <= 3 && w === w.toUpperCase() ? w : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join(" ");
}

/** Lookup key: uppercase, no whitespace or punctuation. Display format is kept separately. */
export function normalizeReference(raw: string): string {
  return stripDiacritics(raw).toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function slugify(s: string): string {
  return stripDiacritics(s)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type Confidence = "high" | "medium" | "low" | "rejected";

export interface MatchInput {
  brand: string;
  reference?: string | null;
  family?: string | null;
  name?: string | null;
  material?: string | null;
  dial?: string | null;
  sizeMm?: number | null;
}

export interface MatchResult {
  confidence: Confidence;
  score: number;
  reasons: string[];
}

const norm = (s?: string | null) => (s ? stripDiacritics(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() : "");

/** null = one side missing (unknown), true = compatible, false = contradiction */
function compat(a?: string | null, b?: string | null): boolean | null {
  const x = norm(a);
  const y = norm(b);
  if (!x || !y) return null;
  return x === y || x.includes(y) || y.includes(x);
}

/**
 * Layered match: brand -> normalised reference -> family -> variant attributes.
 * High = auto-link; medium = human review; low = never auto-merge; rejected = keep distinct.
 */
export function matchRecords(source: MatchInput, candidate: MatchInput): MatchResult {
  const reasons: string[] = [];
  if (normalizeBrand(source.brand) !== normalizeBrand(candidate.brand)) {
    return { confidence: "rejected", score: 0, reasons: ["brand differs"] };
  }
  const sRef = source.reference ? normalizeReference(source.reference) : "";
  const cRef = candidate.reference ? normalizeReference(candidate.reference) : "";

  if (sRef && cRef && sRef !== cRef) {
    return { confidence: "rejected", score: 0, reasons: ["reference differs"] };
  }

  const material = compat(source.material, candidate.material);
  const dial = compat(source.dial, candidate.dial);
  const size =
    source.sizeMm != null && candidate.sizeMm != null ? Math.abs(source.sizeMm - candidate.sizeMm) <= 0.6 : null;

  if (sRef && cRef) {
    reasons.push("exact brand + normalised reference");
    if (material === false) {
      return { confidence: "rejected", score: 0.2, reasons: [...reasons, "contradictory case material"] };
    }
    const conflicts = [dial, size].filter((v) => v === false).length;
    const unknown = [material, dial, size].filter((v) => v === null).length;
    if (conflicts > 0) return { confidence: "medium", score: 0.7, reasons: [...reasons, "variant attribute conflict"] };
    if (unknown === 3) return { confidence: "medium", score: 0.75, reasons: [...reasons, "no variant data to verify"] };
    return { confidence: "high", score: 0.95 - unknown * 0.03, reasons: [...reasons, "variant compatible"] };
  }

  // No confirmed reference on at least one side: fuzzy only, never auto-merge.
  const fam = compat(source.family ?? source.name, candidate.family ?? candidate.name);
  reasons.push(fam ? "fuzzy family/name match, no confirmed reference" : "no reference and no family match");
  return { confidence: "low", score: fam ? 0.4 : 0.1, reasons };
}
