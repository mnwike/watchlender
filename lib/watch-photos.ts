/**
 * Photographs copied from open-source GitHub projects only where source credits
 * document reuse rights. Never use a family photo to imply exact reference proof.
 * All pictures remain illustrative; authentication is performed separately.
 */
export interface WatchPhoto {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
  license: string;
}
export const WATCH_PHOTOS: Record<string, WatchPhoto> = {
  "rolex:16013": {
    src: "/watch-photos/datejust.jpg",
    alt: "Illustrative photograph of a Rolex Datejust reference 16013",
    credit: "anna2005",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rolex_Datejust_16013.jpg",
    license: "CC0",
  },
  "seiko:SKX007": {
    src: "/watch-photos/skx007.jpg",
    alt: "Illustrative photograph of a Seiko SKX007 automatic diving watch",
    credit: "Ashley Pomeroy",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Seiko_SKX007.jpg",
    license: "CC BY-SA 4.0",
  },
  "rolex:16610": {
    src: "/watch-photos/rolex-submariner.jpg",
    alt: "Photograph of a Rolex Submariner wristwatch (illustrative)",
    credit: "FrankWilliams",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rolex-Submariner.jpg",
    license: "Public domain",
  },
  "omega:31130423001005": {
    src: "/watch-photos/omega-speedmaster.jpg",
    alt: "Photograph of an Omega Speedmaster Professional wristwatch (illustrative)",
    credit: "Daniel Zimmermann",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Classic_Speedy_(24067321725).jpg",
    license: "CC BY 2.0",
  },
};
export const getWatchPhoto = (brandSlug: string, normalizedReference: string) =>
  WATCH_PHOTOS[`${brandSlug}:${normalizedReference}`] ?? null;
