// Reference spot prices in GBP per troy ounce. The values live in metal-prices.json, which
// scripts/fetch-prices.mjs refreshes from the "WatchLender live prices" Google Sheet before every
// build (daily, via the scheduled GitHub Actions run). These are spot prices, not an offer to buy.
import prices from "./metal-prices.json";

export const METAL_PRICES = prices as {
  asOf: string;
  source: { name: string; url: string };
  perOzGBP: { gold: number; silver: number; platinum: number };
};
