// One interface for every data provider (build brief section 6).
// An adapter may only be enabled when its licence allows the stated use.

export type LicenceScope = "none" | "internal" | "public-display";

export interface ProviderWatch {
  externalId: string;
  externalUrl?: string;
  rawBrand: string;
  rawReference: string;
  name?: string;
  family?: string;
  material?: string;
  dial?: string;
  sizeMm?: number;
  specs?: Record<string, unknown>;
}

export interface ProviderValuation {
  externalId: string;
  value: string; // decimal string, never a float
  currency: string;
  estimatedAt: string;
  methodologyLabel: string;
}

export interface ProviderListing {
  listingId: string;
  externalId?: string;
  title: string;
  askPrice: string;
  currency: string;
  condition?: string;
  year?: number;
  boxPapers?: string;
  location?: string;
  listingUrl: string;
}

export interface ProviderImage {
  url: string;
  licenceType: string;
  attribution: string;
  rightsExpiry?: string;
}

export interface ProviderAdapter {
  readonly id: string;
  /** What the signed licence permits. Public pages must check for "public-display". */
  readonly licence: LicenceScope;
  /** True when real credentials are configured; fixture adapters return false. */
  readonly live: boolean;
  searchByReference(brand: string, reference: string): Promise<ProviderWatch[]>;
  fetchModel(externalId: string): Promise<ProviderWatch | null>;
  fetchValuations(externalId: string): Promise<ProviderValuation[]>;
  fetchListings(externalId: string): Promise<ProviderListing[]>;
  fetchImages(externalId: string): Promise<ProviderImage[]>;
}

export class NotLicensedError extends Error {
  constructor(provider: string, what: string) {
    super(`${provider}: ${what} is not available under the current licence/credentials`);
  }
}
