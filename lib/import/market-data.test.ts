import { describe, expect, it } from "vitest";
import { selectTopShare, stageMarketData, type FeedRow } from "./market-data";

const base: FeedRow = {
  provider: "licensed-fixture", providerId: "test-1", brand: "Rolex", reference: "126610LN",
  kind: "estimated-market-value", priceGBP: 8500, observedAt: "2026-11-21T00:00:00Z",
  imageUrl: "https://images.example.test/watch.jpg", mediaRights: "unknown",
};

describe("licensed market data staging", () => {
  it("matches normalised manufacturer reference", () => {
    const result = stageMarketData([{ ...base, reference: "126610-LN" }]);
    expect(result.accepted).toHaveLength(1);
    expect(result.accepted[0].watch.referenceDisplay).toBe("126610LN");
    expect(result.accepted[0].publicImageUrl).toBeNull();
  });

  it("only exposes HTTPS images with explicit public rights", () => {
    const result = stageMarketData([{ ...base, mediaRights: "licensed-public-display" }]);
    expect(result.accepted[0].publicImageUrl).toBe(base.imageUrl);
    const unsafe = stageMarketData([{ ...base, imageUrl: "http://example.test/photo.jpg", mediaRights: "licensed-public-display" }]);
    expect(unsafe.accepted[0].publicImageUrl).toBeNull();
  });

  it("does not mistake asking prices for market valuations", () => {
    const result = stageMarketData([{ ...base, kind: "dealer-asking-price" }]);
    expect(result.accepted[0].row.kind).toBe("dealer-asking-price");
  });

  it("flags unknown references for human review", () => {
    const result = stageMarketData([{ ...base, reference: "UNKNOWN-999" }]);
    expect(result.accepted).toHaveLength(0);
    expect(result.needsReview).toHaveLength(1);
  });

  it("rejects invalid prices and duplicate provider records", () => {
    expect(stageMarketData([{ ...base, priceGBP: -20 }]).rejected).toHaveLength(1);
    expect(stageMarketData([base, base]).rejected).toHaveLength(1);
  });
});

describe("popularity share", () => {
  it("rounds up to include 37 of a 100-reference universe", () => {
    expect(selectTopShare(Array.from({ length: 100 }, (_, i) => i))).toHaveLength(37);
  });
  it("supports small ranked universes", () => {
    expect(selectTopShare([1, 2, 3])).toEqual([1, 2]);
  });
});
