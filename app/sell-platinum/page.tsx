import type { Metadata } from "next";
import { SellMetalPage } from "@/components/MetalPages";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell platinum jewellery, coins and scrap",
  description: `Sell your platinum for an offer based on weight and purity, with today's reference prices and a calculator. ${SITE.area}.`,
  alternates: { canonical: "/sell-platinum/" },
};

export default function Page() {
  return <SellMetalPage metal="platinum" />;
}
