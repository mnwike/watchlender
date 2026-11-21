import { WATCHES, type Watch } from "./catalogue";
import { normalizeReference, stripDiacritics } from "./normalize";

const tokens = (s: string) =>
  stripDiacritics(s)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

export interface SearchHit {
  watch: Watch;
  score: number;
  exact: boolean;
}

/** Exact reference matches rank ahead of prefix matches, which rank ahead of fuzzy text matches. */
export function searchWatches(query: string, opts: { brand?: string; limit?: number } = {}): SearchHit[] {
  const pool = opts.brand ? WATCHES.filter((w) => w.brandSlug === opts.brand) : WATCHES;
  const q = query.trim();
  if (!q) return pool.slice(0, opts.limit ?? pool.length).map((watch) => ({ watch, score: 0, exact: false }));

  const qRef = normalizeReference(q);
  const qTokens = tokens(q);
  const hits: SearchHit[] = [];

  for (const watch of pool) {
    let score = 0;
    let exact = false;
    if (qRef.length >= 3 && watch.referenceNormalized === qRef) {
      score = 1000;
      exact = true;
    } else if (qRef.length >= 3 && watch.referenceNormalized.startsWith(qRef)) {
      score = 600;
    } else if (qRef.length >= 4 && watch.referenceNormalized.includes(qRef)) {
      score = 400;
    }
    const hay = tokens(`${watch.brand} ${watch.family} ${watch.model} ${watch.material} ${watch.dials.join(" ")} ${watch.movement}`);
    const refTokens = tokens(watch.referenceDisplay);
    let matched = 0;
    for (const t of qTokens) {
      if (hay.includes(t)) (score += 40), matched++;
      else if (refTokens.includes(t)) (score += 60), matched++;
      else if (t.length >= 3 && hay.some((h) => h.startsWith(t))) (score += 20), matched++;
    }
    if (score < 400 && matched < qTokens.length) continue; // every word must match unless the reference did
    if (score > 0) hits.push({ watch, score, exact });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, opts.limit ?? 200);
}
