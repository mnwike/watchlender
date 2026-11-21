import type { Metadata } from "next";
import { PricePerGramPage } from "@/components/MetalPages";
import { gbp, pricePerGram, priceDate, refPerOz } from "@/lib/metals";

export const metadata: Metadata = {
  title: "Silver price per gram UK",
  description: `Silver price per gram in the UK: ${gbp(pricePerGram(refPerOz("silver")))} for pure silver on ${priceDate()}, with prices for each purity and a calculator for your own items.`,
  alternates: { canonical: "/silver-price-per-gram/" },
};

export default function Page() {
  return <PricePerGramPage metal="silver" />;
}
