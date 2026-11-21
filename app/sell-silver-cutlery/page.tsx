import type { Metadata } from "next";
import Link from "next/link";
import { MetalShell, area, HallmarkArt } from "@/components/GoldExtras";
import { MetalLinks, calcProps } from "@/components/MetalPages";
import MetalCalculator from "@/components/MetalCalculator";

export const metadata: Metadata = {
  title: "Sell silver cutlery: sterling silver or silver plate?",
  description: `Sell silver cutlery and tableware. How to tell sterling silver from silver plate, what solid silver is worth by weight, and how to get an offer. ${area}.`,
  alternates: { canonical: "/sell-silver-cutlery/" },
};

const faqs = [
  { q: "How do I know if my cutlery is real silver?", a: "Look for a hallmark on the back of the handle. A lion mark or the number 925 with an assay office symbol means sterling silver. EPNS or EP means it is plated." },
  { q: "Is silver-plated cutlery worth anything?", a: "Not for its silver. A plated set in good condition may have some resale value as cutlery, but it is not bought by weight." },
  { q: "Should I polish it before selling?", a: "There is no need for silver sold by weight. For antique pieces, heavy polishing can do more harm than good." },
  { q: "Is a full canteen worth more than loose pieces?", a: "It can be. A complete matching set by a known maker may sell as a set for more than its silver weight." },
];

export default function Page() {
  return (
    <MetalShell crumbs={[{ href: "/sell-silver", label: "Sell silver" }, { label: "Sell silver cutlery" }]} eyebrow={area} h1="Sell silver cutlery" art={<HallmarkArt mark="925" metal="silver" />} faqs={faqs} faqTitle="Common questions"
      intro={<>Sell sterling silver cutlery, canteens and tableware. The first thing to establish is whether it is solid silver or silver plate, because only solid silver has a metal value.</>}>
      <h2>Sterling silver or silver plate?</h2>
      <ul>
        <li><strong>Solid silver</strong> carries a hallmark: a lion walking to the left on older English pieces, or the number <Link href="/hallmarks/925-silver">925</Link>, along with an assay office mark.</li>
        <li><strong>Silver plate</strong> is marked EPNS, EP, A1 or with a maker&apos;s name only. It has a thin coating of silver over another metal and is not bought for its silver.</li>
        <li>Knives often have solid silver handles filled with resin and a steel blade, so only part of their weight is silver.</li>
      </ul>
      <h2>What solid silver is worth</h2>
      <p>Solid silver is valued by weight. Weigh the forks and spoons, not the knives, and use the calculator for the value of the silver at the spot price.</p>
      <MetalCalculator {...calcProps} initial="silver" />
      <p>Complete canteens, antique pieces and silver by well-known makers can be worth more than their weight. Tell us the maker and pattern if you know them.</p>
      <p>Related: <Link href="/scrap-silver-price">scrap silver price</Link> · <Link href="/silver-price-uk">silver price UK</Link> · <Link href="/sell-silver-coins">sell silver coins</Link></p>
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}
