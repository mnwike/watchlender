/**
 * Image gallery of separately licensed watch photographs.
 * These are examples, not verified photographs of any watch for sale.
 * Do not infer a reference when the source only identifies a watch family.
 */
export interface GalleryPhoto {
  slug: string;
  brand: string;
  model: string;
  reference?: string;
  image: string;
  imageAlt: string;
  sourceUrl: string;
  author: string;
  licence: string;
  licenceUrl?: string;
  specificity: "reference-stated-by-source" | "family-only";
}
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    slug: "rolex-submariner", brand: "Rolex", model: "Submariner", reference: "16610",
    image: "/watch-photos/rolex-submariner.jpg",
    imageAlt: "Photograph of a Rolex Submariner",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rolex-Submariner.jpg",
    author: "FrankWilliams", licence: "Public domain", specificity: "reference-stated-by-source",
  },
  {
    slug: "rolex-datejust", brand: "Rolex", model: "Datejust 36", reference: "16013",
    image: "/watch-photos/datejust.jpg", imageAlt: "Rolex Datejust 36 watch photograph",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rolex_Datejust_16013.jpg",
    author: "anna2005", licence: "CC0", licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    specificity: "reference-stated-by-source",
  },
  {
    slug: "omega-speedmaster", brand: "Omega", model: "Speedmaster Professional", reference: "311.30.42.30.01.005",
    image: "/watch-photos/omega-speedmaster.jpg", imageAlt: "Omega Speedmaster Professional watch photograph",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Classic_Speedy_(24067321725).jpg",
    author: "Daniel Zimmermann", licence: "CC BY 2.0", licenceUrl: "https://creativecommons.org/licenses/by/2.0/",
    specificity: "reference-stated-by-source",
  },
  {
    slug: "grand-seiko", brand: "Grand Seiko", model: "Automatic Hi-Beat",
    image: "/watch-photos/grandseiko.jpg", imageAlt: "Grand Seiko Automatic Hi-Beat watch photograph",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Grand_Seiko_Automatic_Hi-Beat.jpg",
    author: "Dnalor 01", licence: "CC BY-SA 3.0 AT",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/at/",
    specificity: "family-only",
  },
  {
    slug: "cartier-tank", brand: "Cartier", model: "Tank",
    image: "/watch-photos/cartier.jpg", imageAlt: "Cartier Tank watch photograph",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cartier_Tank.jpg",
    author: "Guy Sie", licence: "CC BY-SA 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    specificity: "family-only",
  },
  {
    slug: "omega-seamaster", brand: "Omega", model: "Seamaster",
    image: "/watch-photos/seamaster.jpg", imageAlt: "Omega Seamaster 120M analogue digital watch photograph",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:OMEGA_SEAMASTER_120M_ANALOG_DIGITAL.jpg",
    author: "Zero1970", licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    specificity: "family-only",
  },
  {
    slug: "hamilton-khaki-field", brand: "Hamilton", model: "Khaki Field Mechanical",
    image: "/watch-photos/hamilton.jpg", imageAlt: "Hamilton Khaki Field Mechanical watch photograph",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hamilton_Khaki_Field_Mechanical_39.jpg",
    author: "Giordano Tonelli", licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    specificity: "family-only",
  },
  {
    slug: "seiko-skx007", brand: "Seiko", model: "SKX007",
    image: "/watch-photos/skx007.jpg", imageAlt: "Seiko SKX007 diver watch photograph",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Seiko_SKX007.jpg",
    author: "Ashley Pomeroy", licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    specificity: "reference-stated-by-source",
  },
  {
    slug: "casio-gshock", brand: "Casio", model: "G-Shock GW-M5610U",
    image: "/watch-photos/gshock.jpg", imageAlt: "Casio G-Shock GW-M5610U digital watch photograph",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:CASIO_G-Shock_GW-M5610U.jpg",
    author: "Md. Rifat Hasan Jihan", licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    specificity: "reference-stated-by-source",
  },
];
