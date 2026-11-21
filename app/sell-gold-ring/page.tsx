import type { Metadata } from "next";
import Link from "next/link";
import { MetalShell, area, RingArt } from "@/components/GoldExtras";
import { MetalLinks, calcProps } from "@/components/MetalPages";
import MetalCalculator from "@/components/MetalCalculator";

export const metadata: Metadata = {
  title: "Sell a gold ring: what 9ct, 18ct and 22ct rings are worth",
  description: `Sell a gold ring. Find the hallmark, weigh it and see what the gold is worth at today's reference price, then ask for an offer. ${area}.`,
  alternates: { canonical: "/sell-gold-ring/" },
};

const faqs = [
  { q: "How much is a 9ct gold ring worth?", a: "It depends on its weight. Multiply the weight in grams by the 9ct price per gram, which the calculator on this page does at today's reference price. An offer will be below the spot value." },
  { q: "Do stones add to the weight?", a: "Yes, and they are not gold. A buyer will allow for the weight of any stones, or remove them, before working out the gold value." },
  { q: "Can I sell a ring with no hallmark?", a: "Yes. It will need to be tested to confirm it is gold and what purity before an offer is made." },
  { q: "Is a broken or cut ring still worth selling?", a: "Yes. Damage does not change the amount of gold in it." },
];

export default function Page() {
  return (
    <MetalShell crumbs={[{ href: "/sell-gold", label: "Sell gold" }, { label: "Sell a gold ring" }]} eyebrow={area} h1="Sell a gold ring" art={<RingArt />} faqs={faqs} faqTitle="Common questions"
      intro={<>Sell a gold ring, signet ring or band. A ring without stones is valued on its gold: find the hallmark, weigh it and you have a guide figure before you ask for an offer.</>}>
      <h2>Three steps to a guide value</h2>
      <ol>
        <li>Read the hallmark inside the band: <Link href="/hallmarks/375-gold">375</Link> is 9ct, <Link href="/hallmarks/585-gold">585</Link> is 14ct, <Link href="/hallmarks/750-gold">750</Link> is 18ct and <Link href="/hallmarks/916-gold">916</Link> is 22ct.</li>
        <li>Weigh the ring in grams on kitchen or jewellery scales.</li>
        <li>Enter both in the calculator for the value of the gold at the spot price.</li>
      </ol>
      <MetalCalculator {...calcProps} initial="gold" />
      <h2>When a ring is worth more than its gold</h2>
      <p>Rings set with diamonds or gemstones, antique rings and rings by well-known makers are valued as jewellery, not scrap. See <Link href="/sell-diamond-ring">sell a diamond ring</Link> or <Link href="/sell-jewellery">sell jewellery</Link>.</p>
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}
