import { SEED } from "@/data/seed";
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
  dial: string;
  bezel: string | null;
  movement: string;
  status: "unverified" | "verified";
  url: string;
}

function build(): Watch[] {
  const out: Watch[] = [];
  const seen = new Set<string>();
  for (const [rawBrand, rows] of Object.entries(SEED)) {
    const brand = normalizeBrand(rawBrand);
    const brandSlug = slugify(brand);
    for (const [family, model, ref, sizeMm, material, dial, movement, bezel] of rows) {
      const referenceNormalized = normalizeReference(ref);
      const key = `${brandSlug}:${referenceNormalized}`;
      if (seen.has(key)) throw new Error(`Duplicate canonical record ${key}`);
      seen.add(key);
      const slug = `${slugify(model)}-${slugify(ref)}`;
      out.push({
        id: `${brandSlug}/${slug}`,
        brand,
        brandSlug,
        family,
        familySlug: slugify(family),
        model,
        referenceDisplay: ref,
        referenceNormalized,
        slug,
        sizeMm,
        material,
        dial,
        bezel: bezel ?? null,
        movement,
        status: "unverified",
        url: `/watches/${brandSlug}/${slug}/`,
      });
    }
  }
  return out;
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
