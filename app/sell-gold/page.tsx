import type { Metadata } from "next";
import { SellMetalPage } from "@/components/MetalPages";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell gold: scrap gold, jewellery and coins",
  description: `Sell your gold for an offer based on weight and purity, with today's reference prices and a calculator. ${SITE.area}.`,
  alternates: { canonical: "/sell-gold/" },
};

export default function Page() {
  return <SellMetalPage metal="gold" />;
}
