# Catalogue expansion batch 02 — 21 November 2026

Four additional canonical references were added, using brand + normalised model reference as the identity key. These are watch reference pages for identification and valuation enquiries, **not seller listings**. No prices or loan offers are displayed.

| Brand | Reference | Status | Primary evidence | Local photo |
|---|---|---|---|---|
| Rolex Datejust | 16013 | Source checked, seed remains unverified | [Sotheby's 2025](https://www.sothebys.com/en/buy/auction/2025/fine-watches-pf2570/datejust-reference-16013-montre-bracelet-en-acier) (36 mm, steel/gold, automatic calibre 3035) | `datejust.jpg` CC0, original reference identified by upstream photo |
| Seiko SKX007 | SKX007 | Source checked, seed remains unverified | [Seiko 7S26 technical manual](https://www.seikowatches.com/uk-en/-/media/Files/Common/Seiko/instructions/English/7/7S26/7S26.pdf) and [SKX007 specifications](https://watch.co/seiko/classics/skx007) | `skx007.jpg` CC BY-SA 4.0, reference named by upstream photo |
| Hamilton Khaki Field Mechanical | H69439931 | Manufacturer listed | [Hamilton model page](https://www.hamiltonwatch.com/en-gb/collection/khaki-field/h69439931-khaki-field-mechanical.html) | No exact-reference photo approved |
| Casio G-Shock | GW-M5610U-1ER | Manufacturer listed | [Casio UK model page](https://www.casio.com/uk/watches/gshock/product.GW-M5610U-1/) | No exact-suffix photo approved |

**Seiko reference granularity:** SKX007 is a family-level model code and there are suffix variants (such as J and K versions). Do not collapse subreferences when the suffix changes the actual configuration.

**Casio dimensions:** official 46.7 x 43.2 x 12.7 mm (L x W x H). The seed uses 43.2 mm as nominal case width; it is not a round-case diameter.

**Hamilton:** manual-wind H-50, 38 mm. The existing gallery Hamilton photograph is family-only and is *not* assigned to H69439931.

Source evidence supports descriptive facts, not permission to copy the photos published by dealers or manufacturers. Two previously imported, credited Commons images have been linked to the matching reference pages. Image credits are displayed on the page and logged in `docs/watch-photo-attribution.md`.

The deployment pipeline has not been run by this change. Run `npm ci`, `npm test`, `npm run typecheck` and `npm run build` before merging. Keep `LOANS_MODE=waitlist` and public pricing disabled.
