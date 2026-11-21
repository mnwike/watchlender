import type { Metadata } from "next";
import { ScrapPage } from "@/components/GoldExtras";
import { PURITIES, gbp, pricePerGram, priceDate, refPerOz } from "@/lib/metals";

const p = PURITIES.gold[0];
export const metadata: Metadata = {
  title: "Scrap gold price per gram UK",
  description: `Scrap gold price guide: ${p.label} gold contained ${gbp(pricePerGram(refPerOz("gold")) * p.fineness)} of metal per gram at spot on ${priceDate()}. Prices by purity, how offers are worked out and a calculator.`,
  alternates: { canonical: "/scrap-gold-price/" },
};

export default function Page() {
  return <ScrapPage metal="gold" />;
}
