# WatchLender

Independent luxury-watch catalogue for watchlender.co.uk. Every reference gets a search-optimised
page with a "sell my watch" / "borrow against it" enquiry form.

## Run it

```bash
npm install
npm test          # matching, search, lead validation, provider guards
npm run dev       # http://localhost:3000
npm run build     # static site in ./out
```

## Hosting: GitHub Pages

The site is a static export (plain HTML, CSS and JS), deployed by `.github/workflows/deploy.yml`
on every push to `main`.

1. Push this folder to a GitHub repository (Pages on the free plan needs it to be public).
2. Repository Settings > Pages > Source: **GitHub Actions**.
3. Settings > Secrets and variables > Actions > Variables: add `LEAD_ENDPOINT` (see below).
4. DNS at IONOS for watchlender.co.uk: A records for `@` to 185.199.108.153, 185.199.109.153,
   185.199.110.153, 185.199.111.153 and a CNAME for `www` to `<username>.github.io`.
   `public/CNAME` already names the domain. Then tick "Enforce HTTPS" in Pages settings.

### Enquiry forms

A static site has no server, so the form posts JSON to `NEXT_PUBLIC_LEAD_ENDPOINT`: a form
service that emails you each enquiry, or your own endpoint later. Until it is set, the form
tells visitors that online enquiries are not switched on; it never pretends to send.

## Layout

| Path | What it is |
| --- | --- |
| `data/seed.ts` | Seed catalogue, compact rows per brand. Add watches here. |
| `lib/normalize.ts` | Brand/reference normalisation and the layered match-confidence rules |
| `lib/catalogue.ts` | Canonical records, slugs, URLs (one per brand + reference) |
| `lib/search.ts` | Search: exact reference first, then prefix, then text |
| `lib/leads.ts` | Lead validation (shared by the form) |
| `lib/lead-store.ts` | Server-side lead storage for a later self-hosted version |
| `components/Browse.tsx` | In-browser search and brand filter |
| `data/listings.ts` | Watches for sale. Add a reviewed listing here and push; its page is built automatically. |
| `lib/providers/` | Adapter interface, fixture provider, licence-gated provider skeletons |
| `db/migrations/` | PostgreSQL schema from the build brief, plus `lead` and `fx_rate` |
| `app/` | Pages, sitemap.xml, robots.txt |

## Data and image rules

- The catalogue holds factual identification data compiled independently. Every seed row is
  `unverified` until checked against manufacturer documentation.
- No prices are shown publicly. Provider adapters refuse to run without a key **and** a licence
  scope; public pages may only use a provider whose licence is `public-display`.
- No third-party photographs are stored or hot-linked. Watches show an original illustration until
  a licensed image exists; `media_asset` rows require a licence type and attribution.
- Loan enquiries run in `waitlist` mode until the `LOANS_MODE` variable is `live`.

## Before launch

1. Fill in `lib/site.ts` (legal entity, contact details) and complete `/privacy`.
2. Verify the seed specs; expand the catalogue (licensed feed or manual additions).
3. Confirm the regulatory position for loan enquiries before setting `LOANS_MODE` to `live`.
4. Choose the enquiry form service and name it in the privacy notice.

## Listings (marketplace, phase 1)

Owners submit a listing from `/list-my-watch/`. After review, add it to `data/listings.ts` with the
seller's own photos in `public/listings/`. It then appears on `/for-sale/`, on its own page with a
buyer enquiry form, and on the page for that reference. There are no seller accounts, online
payments or escrow: those need a server, a payments provider and legal review.

## Not built yet

Admin review UI, scheduled ingestion jobs, valuation display, price history, comparables.
The schema and adapter interface are in place for them.
