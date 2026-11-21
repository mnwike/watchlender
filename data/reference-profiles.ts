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
  "seiko:SPB143J1": {
    summary: "The Seiko Prospex SPB143J1 draws on the brand's 1965 diver design. It has a 40.5 mm stainless-steel case, a 6R35 automatic movement with manual winding and a stated 70-hour power reserve.",
    identification: "Confirm the full SPB143J1 suffix, dial, bracelet and case details. Later Prospex divers may look similar but have different movements and water-resistance specifications.",
    provenance: { name: "Seiko official reference details", url: "https://www.seikowatches.com/ph-en/products/prospex/SPB143J1" },
  },
  "seiko:SPB145J1": {
    summary: "The Seiko Prospex SPB145J1 is a special edition within the 1965-inspired diver's range. Its stainless-steel case measures 40.5 mm and the automatic 6R35 movement offers manual winding and approximately 70 hours of reserve.",
    identification: "Check the special-edition caseback markings and exact reference suffix; similar Prospex dial and bracelet versions should not be treated as interchangeable.",
    provenance: { name: "Seiko UK specifications", url: "https://www.seikowatches.com/uk-en/products/prospex/spb145j1" },
  },
  "grand-seiko:SBGA415": {
    summary: "Grand Seiko's SBGA415 Taisetsu is a Heritage collection model with a 40 mm high-intensity titanium case and the Spring Drive 9R65 calibre. Its textured grey dial evokes seasonal Japanese scenery.",
    identification: "Check the SBGA415 reference, dial texture, case material and Spring Drive power-reserve indicator. The SBGA413 is related but has a different dial finish.",
    provenance: { name: "Grand Seiko official specifications", url: "https://www.grand-seiko.com/uk-en/collections/sbga415g" },
  },
  "hamilton:H70455533": {
    summary: "The Hamilton Khaki Field Auto H70455533 is a 38 mm steel field watch powered by the automatic H-10 calibre with approximately 80 hours of reserve. The black dial pairs field-watch legibility with a sapphire crystal.",
    identification: "Check the full Hamilton reference and leather strap configuration. The visually similar Khaki Field Mechanical uses a hand-wound movement, not the automatic H-10.",
    provenance: { name: "Hamilton official specifications", url: "https://www.hamiltonwatch.com/en-gb/h70455533-khaki-field-auto.html" },
  },
  "casio:GA21001A1ER": {
    summary: "The Casio G-Shock GA-2100-1A1ER has a black analog-digital dial, octagonal carbon-and-resin case and 200-metre water resistance. Its case measures 48.5 by 45.4 mm and is 11.8 mm thick.",
    identification: "Confirm the complete model suffix, digital display and caseback module; this battery-powered GA-2100 is distinct from solar-powered GA-B2100 variants.",
    provenance: { name: "Casio UK official specifications", url: "https://www.casio.com/uk/watches/gshock/product.GA-2100-1A1/" },
  },
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
