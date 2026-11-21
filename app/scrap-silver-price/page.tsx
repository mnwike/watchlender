import type { Metadata } from "next";
import { ScrapPage } from "@/components/GoldExtras";
import { PURITIES, gbp, pricePerGram, priceDate, refPerOz } from "@/lib/metals";

const p = PURITIES.silver[0];
export const metadata: Metadata = {
  title: "Scrap silver price per gram UK",
  description: `Scrap silver price guide: ${p.label} silver contained ${gbp(pricePerGram(refPerOz("silver")) * p.fineness)} of metal per gram at spot on ${priceDate()}. Prices by purity, how offers are worked out and a calculator.`,
  alternates: { canonical: "/scrap-silver-price/" },
};

export default function Page() {
  return <ScrapPage metal="silver" />;
}
