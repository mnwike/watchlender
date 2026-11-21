import { WATCHES } from "../catalogue";
import { normalizeBrand, normalizeReference } from "../normalize";
import { NotLicensedError, type LicenceScope, type ProviderAdapter, type ProviderWatch } from "./types";

/** Clearly labelled fixture provider. Never presented as live data. */
export const fixtureProvider: ProviderAdapter = {
  id: "fixture",
  licence: "internal",
  live: false,
  async searchByReference(brand, reference) {
    const b = normalizeBrand(brand);
    const r = normalizeReference(reference);
    return WATCHES.filter((w) => w.brand === b && w.referenceNormalized === r).map(toProviderWatch);
  },
  async fetchModel(externalId) {
    const w = WATCHES.find((x) => x.id === externalId);
    return w ? toProviderWatch(w) : null;
  },
  async fetchValuations() {
    return []; // no invented prices
  },
  async fetchListings() {
    return [];
  },
  async fetchImages() {
    return [];
  },
};

function toProviderWatch(w: (typeof WATCHES)[number]): ProviderWatch {
  return {
    externalId: w.id,
    rawBrand: w.brand,
    rawReference: w.referenceDisplay,
    name: w.model,
    family: w.family,
    material: w.material,
    dial: w.dial,
    sizeMm: w.sizeMm ?? undefined,
  };
}

/**
 * Skeleton for a licensed valuation/catalogue provider (e.g. WatchCharts API, WatchBase Data Feed).
 * Endpoint paths and payload mapping must be filled in from the provider's current documentation
 * once an agreement is signed; nothing here calls a network until then.
 */
export function licensedProvider(id: string, env: { apiKey?: string; licence?: string }): ProviderAdapter {
  const licence = (["internal", "public-display"].includes(env.licence ?? "") ? env.licence : "none") as LicenceScope;
  const guard = (what: string): never => {
    throw new NotLicensedError(id, what);
  };
  return {
    id,
    licence,
    live: Boolean(env.apiKey) && licence !== "none",
    searchByReference: async () => guard("searchByReference"),
    fetchModel: async () => guard("fetchModel"),
    fetchValuations: async () => guard("fetchValuations"),
    fetchListings: async () => guard("fetchListings"),
    fetchImages: async () => guard("fetchImages"),
  };
}

export const providers = {
  fixture: fixtureProvider,
  watchcharts: licensedProvider("watchcharts", {
    apiKey: process.env.WATCHCHARTS_API_KEY,
    licence: process.env.WATCHCHARTS_LICENCE,
  }),
  watchbase: licensedProvider("watchbase", {
    apiKey: process.env.WATCHBASE_API_KEY,
    licence: process.env.WATCHBASE_LICENCE,
  }),
};

/** Public pages may only show provider data when the licence explicitly allows display. */
export const canDisplayPublicly = (p: ProviderAdapter) => p.live && p.licence === "public-display";
