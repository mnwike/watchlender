# WatchLender market-data import: handoff and blockers

This branch adds an **import staging layer**, not public pricing or marketplace listings.

## Current repository findings

- `data/seed.ts` contains many independently compiled watch references, but many rows remain unverified.
- `data/manufacturer/rolex.ts` contains manufacturer-checked Rolex references.
- `data/listings.ts` must remain empty until real sellers submit permissioned photos and listings.
- `lib/providers/index.ts` has licence-gated provider placeholders, not live API integrations.
- The production site currently has no authorised public market-data licence and no completed marketplace listings.

## Workflow for importing the most popular 37%

1. Export UK watch-related keyword/search-demand data from Ahrefs (brand, model, reference, monthly searches, country, extraction date). Keep the export internal; the export was not available to the assistant in this iteration.
2. Define and log the **denominator**: e.g. all distinct manufacturer references found in a documented search-demand universe, not 37% of arbitrary marketplace advertisements. Deduplicate by brand + normalised reference.
3. Rank by relevant UK monthly searches; combine comparable spelling/reference variants. Resolve ties consistently. Flag missing search-volume data for research rather than treating it as zero.
4. Take `Math.ceil(universe.length * 0.37)` top records using `selectTopShare`.
5. Join each ranked row to the canonical catalogue using brand + normalised manufacturer reference. Human-review dial, material and size variations; do not auto-merge ambiguous variants.
6. Obtain authorised market data from a licensed provider. Distinguish its **estimated market value** from **dealer asking prices** and **completed-sale prices**; never average these categories blindly.
7. Deliver observations as `FeedRow[]` to `stageMarketData`. Use `accepted` only after confirming the source contract, `needsReview` for unmatched/ambiguous data, and never publish `rejected` data.
8. Permit an external photograph to be displayed only with explicit public-image rights and attribution requirements satisfied. Unknown/internal-only photos must not appear. Do not infer that a public GitHub repo conveys rights to images or third-party datasets.
9. A server-side importer is required for scheduled updates. GitHub Pages serves a static site; a licensed snapshot could be generated in CI only if credentials, contracts and renewal schedules permit. Do not commit API keys.
10. Add a carefully labelled price view **only once** owner approval and public-display licences are confirmed. Show GBP currency, price type, provider attribution, observation timestamp, and a clear indicative—not a loan offer—disclaimer. Retain `LOANS_MODE=waitlist` until reviewed.

## Research and licensing still needed

- A usable Ahrefs keyword export and documented UK competitor analysis (Watchfinder, Chrono24 and other major UK watch businesses).
- Explicit confirmation that the owner wishes to change the current **no public prices** policy.
- WatchCharts (or other provider) commercial display licence, access tokens, endpoint documentation, request/refresh limits.
- A separately licensed catalogue of exact reference-specific images (including appropriate rights for caching, thumbnails and attribution).
- Supplier agreement if any data is sourced through an unofficial Chrono24 tool; a repository on GitHub is not itself a lawful data licence.

## Validation

New tests in `lib/import/market-data.test.ts` cover reference matching, public-image safeguards, unknown references, invalid prices, price type preservation and 37% selection.

Build/test status: changes prepared for review on a feature branch; automated GitHub Actions check should be confirmed before merging. No production files or marketplace listings were modified.
