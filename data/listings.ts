// Watches listed for sale on WatchLender. Add a listing here only after it has been reviewed:
// seller identity checked, photos supplied by the seller with permission to publish, price confirmed.
// The site rebuilds and publishes the listing page on the next push. Never add sample listings here.
export interface ListingRow {
  id: string; // short unique id, e.g. "wl-0001"
  watchId: string; // catalogue id, e.g. "rolex/submariner-date-126610ln"
  priceGBP: string; // decimal string
  year?: number;
  condition: "Unworn" | "Excellent" | "Good" | "Worn" | "Needs repair";
  boxPapers: "Box and papers" | "Papers only" | "Box only" | "Neither";
  location: string; // town or area only
  sellerType: "Private seller" | "Dealer" | "WatchLender";
  description: string;
  photos: { src: string; alt: string }[]; // files in /public/listings/, seller-supplied
  listedAt: string; // ISO date
  status: "live" | "sold" | "withdrawn";
}

export const LISTINGS: ListingRow[] = [];
