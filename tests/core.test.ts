import { describe, expect, it } from "vitest";
import { matchRecords, normalizeBrand, normalizeReference, slugify } from "@/lib/normalize";
import { BRANDS, WATCHES } from "@/lib/catalogue";
import { searchWatches } from "@/lib/search";
import { validateLead } from "@/lib/leads";
import { canDisplayPublicly, fixtureProvider, providers } from "@/lib/providers";

describe("reference normalisation", () => {
  it("strips punctuation, spaces and case", () => {
    expect(normalizeReference(" 126610 ln ")).toBe("126610LN");
    expect(normalizeReference("5711/1A-010")).toBe("57111A010");
    expect(normalizeReference("310.30.42.50.01.001")).toBe("31030425001001");
  });
  it("normalises brand aliases", () => {
    expect(normalizeBrand("AP")).toBe("Audemars Piguet");
    expect(normalizeBrand("a. lange & söhne")).toBe("A. Lange & Söhne");
    expect(normalizeBrand("  rolex ")).toBe("Rolex");
  });
  it("slugifies accents", () => expect(slugify("A. Lange & Söhne")).toBe("a-lange-and-sohne"));
});

describe("matching", () => {
  const sub = { brand: "Rolex", reference: "126610LN", family: "Submariner", material: "Steel", dial: "Black", sizeMm: 41 };
  it("auto-links exact reference with compatible variant", () => {
    expect(matchRecords({ ...sub, reference: "126610 LN" }, sub).confidence).toBe("high");
  });
  it("queues for review when variant data is missing or conflicting", () => {
    expect(matchRecords({ brand: "Rolex", reference: "126610LN" }, sub).confidence).toBe("medium");
    expect(matchRecords({ ...sub, dial: "Green" }, sub).confidence).toBe("medium");
  });
  it("never merges on family name alone", () => {
    expect(matchRecords({ brand: "Rolex", name: "Submariner" }, sub).confidence).toBe("low");
  });
  it("rejects different references, brands and contradictory material", () => {
    expect(matchRecords({ ...sub, reference: "126610LV" }, sub).confidence).toBe("rejected");
    expect(matchRecords({ ...sub, brand: "Tudor" }, sub).confidence).toBe("rejected");
    expect(matchRecords({ ...sub, material: "Yellow gold" }, sub).confidence).toBe("rejected");
  });
});

describe("catalogue", () => {
  it("has one canonical record per brand + reference and unique URLs", () => {
    expect(WATCHES.length).toBeGreaterThan(150);
    expect(new Set(WATCHES.map((w) => w.url)).size).toBe(WATCHES.length);
    expect(new Set(WATCHES.map((w) => `${w.brandSlug}:${w.referenceNormalized}`)).size).toBe(WATCHES.length);
    expect(BRANDS.reduce((n, b) => n + b.count, 0)).toBe(WATCHES.length);
  });
});

describe("search", () => {
  it("ranks an exact reference first regardless of formatting", () => {
    const hits = searchWatches("126610 ln");
    expect(hits[0].watch.referenceDisplay).toBe("126610LN");
    expect(hits[0].exact).toBe(true);
  });
  it("finds by brand and model words", () => {
    const hits = searchWatches("rolex submariner");
    expect(hits.length).toBeGreaterThan(5);
    expect(hits.every((h) => h.watch.family === "Submariner")).toBe(true);
  });
  it("returns nothing for nonsense", () => expect(searchWatches("zzzzqqq")).toHaveLength(0));
});

describe("lead validation", () => {
  const ok = { intent: "sell", name: "Sam Tester", email: "sam@example.com", watchText: "Rolex 126610LN", consent: true };
  it("accepts a complete enquiry", () => expect(validateLead(ok).ok).toBe(true));
  it("requires consent, a valid email and a watch", () => {
    expect(validateLead({ ...ok, consent: false }).ok).toBe(false);
    expect(validateLead({ ...ok, email: "nope" }).ok).toBe(false);
    expect(validateLead({ ...ok, watchText: "" }).ok).toBe(false);
  });
});

describe("providers", () => {
  it("fixture provider invents no prices or images and is never public", async () => {
    expect(await fixtureProvider.fetchValuations("x")).toEqual([]);
    expect(await fixtureProvider.fetchImages("x")).toEqual([]);
    expect(canDisplayPublicly(fixtureProvider)).toBe(false);
  });
  it("licensed providers refuse to run without a licence", async () => {
    expect(providers.watchcharts.live).toBe(false);
    await expect(providers.watchcharts.fetchValuations("x")).rejects.toThrow(/not available/);
  });
});

import { resolveListings, formatGBP } from "@/lib/listings";
describe("listings", () => {
  const row = { id: "t-1", watchId: "rolex/submariner-date-126610ln", priceGBP: "9500", condition: "Excellent" as const, boxPapers: "Box and papers" as const, location: "London", sellerType: "Private seller" as const, description: "Test fixture", photos: [], listedAt: "2026-01-01", status: "live" as const };
  it("links a listing to its catalogue reference", () => {
    const [l] = resolveListings([row]);
    expect(l.title).toBe("Rolex Submariner Date 126610LN");
    expect(l.url).toBe("/for-sale/t-1/");
    expect(formatGBP(l.priceGBP)).toBe("£9,500");
  });
  it("rejects unknown watches, duplicate ids and float-style prices", () => {
    expect(() => resolveListings([{ ...row, watchId: "rolex/nope" }])).toThrow(/unknown watch/);
    expect(() => resolveListings([row, row])).toThrow(/Duplicate/);
    expect(() => resolveListings([{ ...row, priceGBP: "9,500" }])).toThrow(/decimal/);
  });
  it("requires an asking price to list, and accepts buyer enquiries by listing id", () => {
    const base = { name: "Sam Tester", email: "sam@example.com", consent: true };
    expect(validateLead({ ...base, intent: "list", watchText: "Rolex" }).ok).toBe(false);
    expect(validateLead({ ...base, intent: "list", watchText: "Rolex", askingPrice: "£9,500" }).ok).toBe(true);
    expect(validateLead({ ...base, intent: "buy", listingId: "t-1" }).ok).toBe(true);
  });
});

describe("manufacturer-sourced records", () => {
  it("override seed rows, keep seed movement and carry a source", () => {
    const sub = WATCHES.find((w) => w.referenceDisplay === "126610LN")!;
    expect(sub.status).toBe("manufacturer-listed");
    expect(sub.source?.url).toContain("rolex.com");
    expect(sub.movement).toBe("Cal. 3235");
  });
  it("list dial options and stay unverified when the maker's page did not list them", () => {
    expect(WATCHES.find((w) => w.referenceDisplay === "126500LN")!.dials).toEqual(["White", "Black"]);
    expect(WATCHES.find((w) => w.referenceDisplay === "116610LN")!.status).toBe("unverified");
  });
});

import { NICKNAMES, nickBrand } from "@/data/nicknames";
describe("nicknames", () => {
  it("every listed reference exists in the Rolex catalogue", () => {
    for (const n of NICKNAMES) for (const r of n.refs) expect(WATCHES.some((w) => w.brand === nickBrand(n) && w.referenceDisplay === r), `${n.slug} ${r}`).toBe(true);
  });
  it("related nicknames resolve", () => {
    for (const n of NICKNAMES) for (const s of n.related ?? []) expect(NICKNAMES.some((x) => x.slug === s && nickBrand(x) === nickBrand(n)), `${n.slug} -> ${s}`).toBe(true);
  });
});

describe("general enquiry (pop-up)", () => {
  it("needs a name, a valid email and consent, but no watch", () => {
    expect(validateLead({ intent: "general", name: "Sam Tester", email: "sam@example.com", consent: true }).ok).toBe(true);
    expect(validateLead({ intent: "general", name: "Sam Tester", email: "sam@example.com", consent: false }).ok).toBe(false);
    expect(validateLead({ intent: "general", name: "", email: "sam@example.com", consent: true }).ok).toBe(false);
  });
});

import { PURITIES, TROY_OUNCE_G, meltValue, pricePerGram } from "@/lib/metals";
describe("precious metal maths", () => {
  it("converts a troy-ounce price to grams", () => expect(pricePerGram(3110.34768)).toBeCloseTo(100, 6));
  it("values metal by weight x purity x price", () => {
    expect(meltValue(10, 0.375, 3110.34768)).toBeCloseTo(375, 4); // 10 g of 9ct at 100/g
    expect(meltValue(TROY_OUNCE_G, 0.999, 2000)).toBeCloseTo(1998, 4);
    expect(meltValue(0, 0.75, 2000)).toBe(0);
  });
  it("uses the standard UK finenesses", () => {
    expect(PURITIES.gold.map((p) => p.mark)).toEqual(["375", "585", "750", "916", "999"]);
    expect(PURITIES.silver[0].fineness).toBe(0.925);
  });
});

// @ts-expect-error plain JS module
import { mergePrices, parseCsv } from "../scripts/fetch-prices.mjs";
describe("price feed from the Google Sheet", () => {
  const current = { asOf: "2026-11-20", source: { name: "x", url: "y" }, perOzGBP: { gold: 2700, silver: 31, platinum: 990 } };
  const csv = (g: string, d = "2026-11-21") => `key,gbp_per_troy_oz,as_of,source,notes\ngold,${g},${d},u,"note, with comma"\nsilver,31.25,${d},u,\nplatinum,992.01,${d},u,`;
  it("accepts sane prices and takes the date", () => {
    const { next, problems } = mergePrices(current, parseCsv(csv("2691.72")));
    expect(problems).toEqual([]);
    expect(next.perOzGBP.gold).toBe(2691.72);
    expect(next.asOf).toBe("2026-11-21");
  });
  it("ignores a typo-sized jump, blanks and bad dates, keeping the old value", () => {
    expect(mergePrices(current, parseCsv(csv("26917.2"))).next.perOzGBP.gold).toBe(2700);
    expect(mergePrices(current, parseCsv(csv(""))).next.perOzGBP.gold).toBe(2700);
    const bad = mergePrices(current, parseCsv(csv("2691.72", "21/11/2026")));
    expect(bad.next.asOf).toBe("2026-11-20");
    expect(bad.problems.length).toBe(3);
  });
});
