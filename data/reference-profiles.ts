/**
 * Independently written reference summaries sourced from manufacturer documentation
 * or identifiable reference specifications. These are identification guides, not
 * authenticity statements or price estimates.
 */
export interface ReferenceProfile {
  summary: string;
  identification: string;
  provenance: { name: string; url: string };
}
export const REFERENCE_PROFILES: Record<string, ReferenceProfile> = {
  "rolex:16013": {
    summary: "The vintage Datejust 16013 pairs a 36 mm stainless-steel case with yellow-gold details. Its automatic calibre 3035 introduced quick-set date adjustment, and examples occur with several dial and bracelet configurations.",
    identification: "Check the full reference, case and bracelet markings, dial configuration and movement. The champagne dial shown here is one example, not a guarantee of how every 16013 looks.",
    provenance: { name: "Sotheby's reference description", url: "https://www.sothebys.com/en/buy/auction/2025/fine-watches-pf2570/datejust-reference-16013-montre-bracelet-en-acier" },
  },
  "seiko:SKX007": {
    summary: "The discontinued Seiko SKX007 is an automatic dive watch with a black dial, rotating bezel and day-date display. It uses Seiko's 7S26 movement and has a published water-resistance rating of 200 metres.",
    identification: "The SKX007 family includes market and bracelet variants. Check the exact suffix on the watch or paperwork before deciding whether it matches an individual listing.",
    provenance: { name: "Seiko 7S26 instructions", url: "https://www.seikowatches.com/uk-en/-/media/Files/Common/Seiko/instructions/English/7/7S26/7S26.pdf" },
  },
  "hamilton:H69439931": {
    summary: "The Hamilton Khaki Field Mechanical H69439931 has a 38 mm stainless-steel case, black dial and hand-wound H-50 movement. Its military-inspired layout emphasises clear numerals and straightforward timekeeping.",
    identification: "Check the H69439931 reference and original strap configuration; similar Khaki Field watches can use different movements, dial colours or cases.",
    provenance: { name: "Hamilton official product specifications", url: "https://www.hamiltonwatch.com/en-gb/collection/khaki-field/h69439931-khaki-field-mechanical.html" },
  },
  "casio:GWM5610U1ER": {
    summary: "The Casio G-Shock GW-M5610U-1ER is a resin-cased digital watch with Tough Solar charging, Multi Band 6 radio time synchronisation and 200-metre water resistance. The square profile takes its cues from the early G-Shock design.",
    identification: "Confirm the full suffix and rear-case module number. Older GW-M5610 variants can differ in display and controls from the updated GW-M5610U model.",
    provenance: { name: "Casio official UK product specifications", url: "https://www.casio.com/uk/watches/gshock/product.GW-M5610U-1/" },
  },
};
