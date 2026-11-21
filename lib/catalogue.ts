import { SEED } from "@/data/seed";
import { ROLEX } from "@/data/manufacturer/rolex";
import { HAMILTON } from "@/data/manufacturer/hamilton";
import { CASIO } from "@/data/manufacturer/casio";
import { normalizeBrand, normalizeReference, slugify } from "./normalize";

export interface Watch {
  id: string; // stable: brandSlug/slug
  brand: string;
  brandSlug: string;
  family: string;
  familySlug: string;
  model: string;
  referenceDisplay: string;
  referenceNormalized: string;
  slug: string;
  sizeMm: number | null;
  material: string;
  dial: string; // primary dial, used for the illustration
  dials: string[]; // all dial options known for this reference
  bezel: string | null;
  movement: string; // "" when not yet sourced
  /** "manufacturer-listed": existence, size, material and dials checked against the maker's own catalogue. */
  status: "unverified" | "manufacturer-listed";
  source: { name: string; url: string; checked: string } | null;
  url: string;
}

export type ManufacturerRow = [string, string, string, number | null, string, string[], string];
export interface ManufacturerSet {
  brand: string;
  sourceName: string;
  sourceBase: string;
  checked: string;
  rows: ManufacturerRow[];
}
const MANUFACTURER_SETS: ManufacturerSet[] = [ROLEX, HAMILTON, CASIO];

function build(): Watch[] {
  const byKey = new Map<string, Watch>();
  const make = (rawBrand: string, family: string, model: string, ref: string, sizeMm: number | null, material: string, dials: string[], movement: string, bezel: string | null): Watch => {
    const brand = normalizeBrand(rawBrand);
    const brandSlug = slugify(brand);
    const slug = `${slugify(model)}-${slugify(ref)}`;
    return {
      id: `${brandSlug}/${slug}`, brand, brandSlug, family, familySlug: slugify(family), model,
      referenceDisplay: ref, referenceNormalized: normalizeReference(ref), slug, sizeMm, material,
      dial: dials[0], dials, bezel, movement, status: "unverified", source: null, url: `/watches/${brandSlug}/${slug}/`,
    };
  };
  for (const [rawBrand, rows] of Object.entries(SEED)) {
    for (const [family, model, ref, sizeMm, material, dial, movement, bezel] of rows) {
      const w = make(rawBrand, family, model, ref, sizeMm, material, [dial], movement, bezel ?? null);
      const key = `${w.brandSlug}:${w.referenceNormalized}`;
      if (byKey.has(key)) throw new Error(`Duplicate canonical record ${key}`);
      byKey.set(key, w);
    }
  }
  // Manufacturer-sourced rows take precedence over seed rows for the fields the source states.
  for (const set of MANUFACTURER_SETS) {
    const seen = new Set<string>();
    for (const [family, model, ref, sizeMm, material, dials, path] of set.rows) {
      const fresh = make(set.brand, family, model, ref, sizeMm, material, dials, "", null);
      const key = `${fresh.brandSlug}:${fresh.referenceNormalized}`;
      if (seen.has(key)) throw new Error(`Duplicate manufacturer row ${key}`);
      seen.add(key);
      const seed = byKey.get(key);
      byKey.set(key, {
        ...fresh,
        dial: seed && dials.includes(seed.dial) ? seed.dial : dials[0],
        movement: seed?.movement ?? "",
        bezel: seed?.bezel ?? null,
        status: "manufacturer-listed",
        source: { name: set.sourceName, url: set.sourceBase + path, checked: set.checked },
      });
    }
  }
  return [...byKey.values()].sort((a, b) => a.brand.localeCompare(b.brand) || a.family.localeCompare(b.family) || a.model.localeCompare(b.model) || a.referenceNormalized.localeCompare(b.referenceNormalized));
}

export const WATCHES: Watch[] = build();

export interface BrandSummary {
  name: string;
  slug: string;
  count: number;
  families: string[];
}

export const BRANDS: BrandSummary[] = Object.values(
  WATCHES.reduce<Record<string, BrandSummary>>((acc, w) => {
    const b = (acc[w.brandSlug] ??= { name: w.brand, slug: w.brandSlug, count: 0, families: [] });
    b.count++;
    if (!b.families.includes(w.family)) b.families.push(w.family);
    return acc;
  }, {}),
).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

export const getWatch = (brandSlug: string, slug: string) =>
  WATCHES.find((w) => w.brandSlug === brandSlug && w.slug === slug);
export const getBrand = (slug: string) => BRANDS.find((b) => b.slug === slug);
export const watchesByBrand = (slug: string) => WATCHES.filter((w) => w.brandSlug === slug);
export const related = (w: Watch, n = 4) =>
  WATCHES.filter((x) => x.id !== w.id && x.brandSlug === w.brandSlug)
    .sort((a, b) => Number(b.familySlug === w.familySlug) - Number(a.familySlug === w.familySlug))
    .slice(0, n);

export const fullName = (w: Watch) => `${w.brand} ${w.model} ${w.referenceDisplay}`;

export interface FamilySummary { brand: BrandSummary; family: string; slug: string; watches: Watch[] }
export const FAMILIES: FamilySummary[] = BRANDS.flatMap((b) =>
  b.families.map((family) => ({ brand: b, family, slug: slugify(family), watches: WATCHES.filter((w) => w.brandSlug === b.slug && w.family === family) })),
);
export const getFamily = (brandSlug: string, familySlug: string) => FAMILIES.find((f) => f.brand.slug === brandSlug && f.slug === familySlug);
