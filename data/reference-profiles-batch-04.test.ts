import { describe, expect, it } from "vitest";
import { WATCHES } from "@/lib/catalogue";
import { REFERENCE_PROFILES } from "@/data/reference-profiles";
import { getWatchPhoto } from "@/lib/watch-photos";

describe("luxury reference batch 04", () => {
  for (const [brand, reference] of [["tudor", "M7939A1A0RU0001"], ["patek-philippe", "5226G001"]]) {
    it(`provides sourced specifications and editorial descriptions for ${brand} ${reference}`, () => {
      const results = WATCHES.filter(w => w.brandSlug === brand && w.referenceNormalized === reference);
      expect(results).toHaveLength(1);
      expect(results[0].status).toBe("manufacturer-listed");
      expect(results[0].source?.url).toMatch(/^https:\/\//);
      expect(REFERENCE_PROFILES[`${brand}:${reference}`]?.summary.length).toBeGreaterThan(30);
      expect(getWatchPhoto(brand, reference)).toBeNull();
    });
  }
});
