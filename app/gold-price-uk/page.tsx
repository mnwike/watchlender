import type { Metadata } from "next";
import { SpotPricePage } from "@/components/GoldExtras";
import { gbp, pricePerGram, priceDate, refPerOz } from "@/lib/metals";

export const metadata: Metadata = {
  title: "Gold price UK today: per ounce, gram and kilo in pounds",
  description: `Gold price in the UK: ${gbp(refPerOz("gold"))} per troy ounce and ${gbp(pricePerGram(refPerOz("gold")))} per gram on ${priceDate()}. Daily reference price with a table by purity and a calculator.`,
  alternates: { canonical: "/gold-price-uk/" },
};

export default function Page() {
  return <SpotPricePage metal="gold" />;
}
