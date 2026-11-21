import type { Metadata } from "next";
import { SpotPricePage } from "@/components/GoldExtras";
import { gbp, pricePerGram, priceDate, refPerOz } from "@/lib/metals";

export const metadata: Metadata = {
  title: "Silver price UK today: per ounce, gram and kilo in pounds",
  description: `Silver price in the UK: ${gbp(refPerOz("silver"))} per troy ounce and ${gbp(pricePerGram(refPerOz("silver")))} per gram on ${priceDate()}. Daily reference price with a table by purity and a calculator.`,
  alternates: { canonical: "/silver-price-uk/" },
};

export default function Page() {
  return <SpotPricePage metal="silver" />;
}
