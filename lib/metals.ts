import { METAL_PRICES } from "@/data/metal-prices";

export type Metal = "gold" | "silver" | "platinum";
export const TROY_OUNCE_G = 31.1034768;

export interface Purity { label: string; mark: string; fineness: number }
export const PURITIES: Record<Metal, Purity[]> = {
  gold: [
    { label: "9ct", mark: "375", fineness: 0.375 },
    { label: "14ct", mark: "585", fineness: 0.585 },
    { label: "18ct", mark: "750", fineness: 0.75 },
    { label: "22ct", mark: "916", fineness: 0.916 },
    { label: "24ct", mark: "999", fineness: 0.999 },
  ],
  silver: [
    { label: "Sterling", mark: "925", fineness: 0.925 },
    { label: "Britannia", mark: "958", fineness: 0.958 },
    { label: "Fine", mark: "999", fineness: 0.999 },
  ],
  platinum: [
    { label: "Platinum 850", mark: "850", fineness: 0.85 },
    { label: "Platinum 900", mark: "900", fineness: 0.9 },
    { label: "Platinum 950", mark: "950", fineness: 0.95 },
    { label: "Platinum 999", mark: "999", fineness: 0.999 },
  ],
};

export const METAL_NAME: Record<Metal, string> = { gold: "Gold", silver: "Silver", platinum: "Platinum" };

/** Fine-gold content of common coins, in grams. */
export const GOLD_COINS = [
  { name: "Full sovereign", fineGrams: 7.3224 },
  { name: "Half sovereign", fineGrams: 3.6612 },
  { name: "Krugerrand (1 oz)", fineGrams: TROY_OUNCE_G },
  { name: "Britannia (1 oz)", fineGrams: TROY_OUNCE_G },
];

export const pricePerGram = (perOz: number) => perOz / TROY_OUNCE_G;
/** Value of the pure metal in an item at the spot price: weight x fineness x price per gram. */
export const meltValue = (grams: number, fineness: number, perOz: number) => grams * fineness * pricePerGram(perOz);
export const refPerOz = (metal: Metal) => METAL_PRICES.perOzGBP[metal];
export const gbp = (n: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);
export const priceDate = () => new Date(METAL_PRICES.asOf + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
