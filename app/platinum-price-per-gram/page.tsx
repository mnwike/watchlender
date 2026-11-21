import type { Metadata } from "next";
import { PricePerGramPage } from "@/components/MetalPages";
import { gbp, pricePerGram, priceDate, refPerOz } from "@/lib/metals";

export const metadata: Metadata = {
  title: "Platinum price per gram UK",
  description: `Platinum price per gram in the UK: ${gbp(pricePerGram(refPerOz("platinum")))} for pure platinum on ${priceDate()}, with prices for each purity and a calculator for your own items.`,
  alternates: { canonical: "/platinum-price-per-gram/" },
};

export default function Page() {
  return <PricePerGramPage metal="platinum" />;
}
