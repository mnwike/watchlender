import type { Metadata } from "next";
import { PricePerGramPage } from "@/components/MetalPages";
import { gbp, pricePerGram, priceDate, refPerOz } from "@/lib/metals";

export const metadata: Metadata = {
  title: "Gold price per gram UK: 9ct, 18ct, 22ct and 24ct",
  description: `Gold price per gram in the UK: ${gbp(pricePerGram(refPerOz("gold")))} for pure gold on ${priceDate()}, with prices for each purity and a calculator for your own items.`,
  alternates: { canonical: "/gold-price-per-gram/" },
};

export default function Page() {
  return <PricePerGramPage metal="gold" />;
}
