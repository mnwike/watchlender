import type { MetadataRoute } from "next";
import { BRANDS, WATCHES } from "@/lib/catalogue";
import { liveListings } from "@/lib/listings";
import { GUIDES } from "@/data/guides";
import { NICKNAMES } from "@/data/nicknames";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string, priority: number) => ({ url: `${SITE.url}${p}`, changeFrequency: "weekly" as const, priority });
  return [
    u("/", 1), u("/sell-my-watch/", 0.9), u("/watch-loans/", 0.9), u("/watches/", 0.8), u("/for-sale/", 0.8), u("/list-my-watch/", 0.9), u("/watch-valuation/", 0.9), u("/sell-my-watch-london/", 0.9), u("/guides/", 0.7), u("/pawn-my-watch/", 0.8), u("/rolex-nicknames/", 0.8),
    ...NICKNAMES.map((n) => u(`/rolex/${n.slug}/`, 0.8)),
    ...BRANDS.map((b) => u(`/sell/${b.slug}/`, 0.8)),
    ...GUIDES.map((g) => u(`/guides/${g.slug}/`, 0.6)),
    ...liveListings().map((l) => u(l.url, 0.7)),
    ...BRANDS.map((b) => u(`/watches/${b.slug}/`, 0.7)),
    ...WATCHES.map((w) => u(w.url, 0.6)),
  ];
}
