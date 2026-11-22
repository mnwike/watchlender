/**
 * Licensed market-data import staging. This module does not fetch, scrape or publish
 * provider content. It validates a feed delivered under an appropriate agreement.
 *
 * Deliberately keep asking prices separate from estimated market values.
 */
import { WATCHES, type Watch } from "../catalogue";
import { matchRecords, normalizeBrand, normalizeReference } from "../normalize";

export type MarketKind = "estimated-market-value" | "dealer-asking-price" | "completed-sale";
export type MediaRights = "licensed-public-display" | "internal-only" | "unknown";

export interface FeedRow {
  provider: string;
  providerId: string;
  brand: string;
  reference: string;
  model?: string;
  dial?: string;
  material?: string;
  sizeMm?: number;
  kind: MarketKind;
  priceGBP: number;
  observedAt: string; // ISO timestamp
  sourceUrl?: string;
  imageUrl?: string;
  mediaRights?: MediaRights;
}

export interface MatchedFeedRow {
  row: FeedRow;
  watch: Watch;
  confidence: "high" | "medium";
  publicImageUrl: string | null;
}

export interface ImportReview {
  accepted: MatchedFeedRow[];
  needsReview: Array<{ row: FeedRow; reason: string }>;
  rejected: Array<{ row: FeedRow; reason: string }>;
}

const kinds = new Set<MarketKind>(["estimated-market-value", "dealer-asking-price", "completed-sale"]);
const secureUrl = (value?: string) => {
  if (!value) return false;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
};

/** Only exact manufacturer reference matches may be imported automatically. */
export function stageMarketData(rows: FeedRow[]): ImportReview {
  const result: ImportReview = { accepted: [], needsReview: [], rejected: [] };
  const seen = new Set<string>();
  for (const row of rows) {
    if (!row.provider?.trim() || !row.providerId?.trim() || !row.brand?.trim() || !row.reference?.trim()
      || !kinds.has(row.kind) || !Number.isFinite(row.priceGBP) || row.priceGBP <= 0
      || !row.observedAt || !Number.isFinite(Date.parse(row.observedAt))) {
      result.rejected.push({ row, reason: "missing identity, valid price, kind or observation date" });
      continue;
    }
    const key = [row.provider, row.providerId, row.kind].join(":");
    if (seen.has(key)) {
      result.rejected.push({ row, reason: "duplicate provider record in import" });
      continue;
    }
    seen.add(key);
    const candidates = WATCHES.filter(w =>
      w.brand === normalizeBrand(row.brand) &&
      w.referenceNormalized === normalizeReference(row.reference)
    );
    if (!candidates.length) {
      result.needsReview.push({ row, reason: "reference absent from canonical catalogue" });
      continue;
    }
    if (candidates.length !== 1) {
      result.needsReview.push({ row, reason: "ambiguous canonical reference" });
      continue;
    }
    const watch = candidates[0];
    const match = matchRecords(
      { brand: row.brand, reference: row.reference, material: row.material, dial: row.dial, sizeMm: row.sizeMm },
      { brand: watch.brand, reference: watch.referenceDisplay, material: watch.material, dial: row.dial ? watch.dial : undefined, sizeMm: watch.sizeMm }
    );
    if (match.confidence === "rejected" || match.confidence === "low") {
      result.rejected.push({ row, reason: match.reasons.join("; ") });
      continue;
    }
    if (match.confidence !== "high") {
      result.needsReview.push({ row, reason: match.reasons.join("; ") });
      continue;
    }
    result.accepted.push({
      row, watch, confidence: "high",
      publicImageUrl: row.mediaRights === "licensed-public-display" && secureUrl(row.imageUrl) ? row.imageUrl! : null,
    });
  }
  return result;
}

/** Select 37% of a documented ranked universe; never substitute catalogue order for popularity. */
export function selectTopShare<T>(ranked: readonly T[], percent = 37): T[] {
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) throw new Error("Percent must be 0..100");
  return ranked.slice(0, Math.ceil(ranked.length * percent / 100));
}
