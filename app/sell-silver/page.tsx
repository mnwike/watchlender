import type { Metadata } from "next";
import { SellMetalPage } from "@/components/MetalPages";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell silver: jewellery, cutlery, coins and scrap",
  description: `Sell your silver for an offer based on weight and purity, with today's reference prices and a calculator. ${SITE.area}.`,
  alternates: { canonical: "/sell-silver/" },
};

export default function Page() {
  return <SellMetalPage metal="silver" />;
}
