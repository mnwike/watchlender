// Reference spot prices in GBP per troy ounce. Update this file (or automate it) to refresh every
// price table and the calculator. These are spot prices, not an offer to buy.
export const METAL_PRICES = {
  asOf: "2026-11-21",
  source: { name: "MetalCharts", url: "https://metalcharts.org/gold-price-in-gbp" },
  perOzGBP: { gold: 2691.72, silver: 31.25, platinum: 992.01 },
} as const;
