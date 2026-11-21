import { LISTINGS, type ListingRow } from "@/data/listings";
import { WATCHES, fullName, type Watch } from "./catalogue";

export interface Listing extends ListingRow {
  watch: Watch;
  title: string;
  url: string;
}

export function resolveListings(rows: ListingRow[]): Listing[] {
  const ids = new Set<string>();
  return rows.map((row) => {
    const watch = WATCHES.find((w) => w.id === row.watchId);
    if (!watch) throw new Error(`Listing ${row.id}: unknown watch ${row.watchId}`);
    if (ids.has(row.id)) throw new Error(`Duplicate listing id ${row.id}`);
    if (!/^\d+(\.\d{1,2})?$/.test(row.priceGBP)) throw new Error(`Listing ${row.id}: price must be a decimal string`);
    ids.add(row.id);
    return { ...row, watch, title: fullName(watch), url: `/for-sale/${row.id}/` };
  });
}

const ALL = resolveListings(LISTINGS);
export const liveListings = () => ALL.filter((l) => l.status === "live");
export const allListings = () => ALL; // sold listings keep their page, marked as sold
export const getListing = (id: string) => ALL.find((l) => l.id === id);
export const listingsForWatch = (watchId: string) => liveListings().filter((l) => l.watchId === watchId);
export const formatGBP = (decimal: string) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: decimal.includes(".") ? 2 : 0 }).format(Number(decimal));
