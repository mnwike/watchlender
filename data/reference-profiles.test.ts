import { describe, expect, it } from "vitest";
import { WATCHES, getWatch } from "@/lib/catalogue";
import { REFERENCE_PROFILES } from "@/data/reference-profiles";
import { getWatchPhoto } from "@/lib/watch-photos";

describe("expanded watch catalogue", () => {
  const cases = [
    ["rolex", "16013"],
    ["seiko", "SKX007"],
    ["hamilton", "H69439931"],
    ["casio", "GWM5610U1ER"],
  ] as const;

  it("contains exactly one record per added brand/reference", () => {
    for (const [brandSlug, normalized] of cases) {
      const matches = WATCHES.filter(
        w => w.brandSlug === brandSlug && w.referenceNormalized === normalized
      );
      expect(matches).toHaveLength(1);
      expect(REFERENCE_PROFILES[`${brandSlug}:${normalized}`]).toBeDefined();
      expect(getWatch(matches[0].brandSlug, matches[0].slug)).toBe(matches[0]);
    }
  });

  it("links only specifically identified new reference photos", () => {
    expect(getWatchPhoto("rolex", "16013")?.src).toBe("/watch-photos/datejust.jpg");
    expect(getWatchPhoto("seiko", "SKX007")?.src).toBe("/watch-photos/skx007.jpg");
    expect(getWatchPhoto("hamilton", "H69439931")).toBeNull();
    expect(getWatchPhoto("casio", "GWM5610U1ER")).toBeNull();
  });

  it("labels official manufacturer-sourced additions accurately", () => {
    for (const [brandSlug, normalized] of cases.slice(2)) {
      const watch = WATCHES.find(w => w.brandSlug === brandSlug && w.referenceNormalized === normalized);
      expect(watch?.status).toBe("manufacturer-listed");
      expect(watch?.source?.url).toMatch(/^https:\/\//);
    }
  });
});
