import { describe, expect, it } from "vitest";
import { WATCHES } from "@/lib/catalogue";
import { REFERENCE_PROFILES } from "@/data/reference-profiles";
import { getWatchPhoto } from "@/lib/watch-photos";

describe("manufacturer-backed expansion batch 03", () => {
  const references = [
    ["seiko", "SPB143J1"],
    ["seiko", "SPB145J1"],
    ["grand-seiko", "SBGA415"],
    ["hamilton", "H70455533"],
    ["casio", "GA21001A1ER"],
  ] as const;
  it("provides one manufacturer-listed record and matching editorial profile per reference", () => {
    for (const [brand, reference] of references) {
      const matches = WATCHES.filter(w => w.brandSlug === brand && w.referenceNormalized === reference);
      expect(matches).toHaveLength(1);
      expect(matches[0].status).toBe("manufacturer-listed");
      expect(matches[0].source?.url).toMatch(/^https:\/\//);
      expect(REFERENCE_PROFILES[`${brand}:${reference}`]?.summary.length).toBeGreaterThan(40);
    }
  });
  it("does not assign unverified photos to new reference pages", () => {
    for (const [brand, reference] of references) {
      expect(getWatchPhoto(brand, reference)).toBeNull();
    }
  });
});
