import type { Metadata } from "next";
import Link from "next/link";
import { MetalShell, area, RingArt } from "@/components/GoldExtras";
import { MetalLinks, calcProps } from "@/components/MetalPages";
import MetalCalculator from "@/components/MetalCalculator";

export const metadata: Metadata = {
  title: "Sell a wedding ring: gold and platinum bands valued by weight",
  description: `Sell a wedding ring or wedding band. Plain bands are valued on their metal and weight; see what yours contains and how to get an offer. ${area}.`,
  alternates: { canonical: "/sell-wedding-ring/" },
};

const faqs = [
  { q: "How much is a wedding ring worth?", a: "A plain band is worth roughly its weight multiplied by the price per gram for its purity. Use the calculator on this page for the metal value at the spot price. An offer will be below that figure." },
  { q: "Can I sell a wedding ring after a divorce or bereavement?", a: "Yes. If the ring is yours to sell, the reason does not matter and we do not need to know it." },
  { q: "Is an engraved ring worth less?", a: "Not to a buyer valuing it for its metal. Engraving only matters if the ring is being resold to wear." },
  { q: "Is platinum worth more than gold?", a: "Not necessarily. It depends on the two metal prices on the day. Check the calculator: it covers gold and platinum." },
];

export default function Page() {
  return (
    <MetalShell crumbs={[{ href: "/sell-jewellery", label: "Sell jewellery" }, { label: "Sell a wedding ring" }]} eyebrow={area} h1="Sell a wedding ring" art={<RingArt />} faqs={faqs} faqTitle="Common questions"
      intro={<>Sell a wedding ring you no longer wear. Plain gold and platinum bands are valued mainly on their metal and weight, so you can work out a guide figure yourself before you ask for an offer.</>}>
      <h2>How a wedding band is valued</h2>
      <ul>
        <li>Find the hallmark inside the band: 375 is 9ct gold, 750 is 18ct, 916 is 22ct and 950 is platinum.</li>
        <li>Weigh it. Most plain bands weigh between a couple of grams and ten grams or so, depending on width and finger size.</li>
        <li>Multiply the weight by the price per gram for that purity. The calculator below does it for you.</li>
        <li>Bands set with diamonds, or made by a well-known jeweller, can be worth more than their metal.</li>
      </ul>
      <h2>Work out the metal value</h2>
      <MetalCalculator {...calcProps} initial="gold" />
      <p>Related: <Link href="/sell-engagement-ring">sell an engagement ring</Link> · <Link href="/sell-gold-ring">sell a gold ring</Link> · <Link href="/hallmarks/750-gold">what 750 means</Link></p>
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}
