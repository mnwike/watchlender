import type { Metadata } from "next";
import Link from "next/link";
import { MetalShell, area, RingArt } from "@/components/GoldExtras";
import { MetalLinks } from "@/components/MetalPages";

export const metadata: Metadata = {
  title: "Sell a diamond ring: valuation, certificates and offers",
  description: `Sell a diamond ring for an offer based on the stone and the setting. What affects the price, which documents help, and how to enquire. ${area}.`,
  alternates: { canonical: "/sell-diamond-ring/" },
};

const faqs = [
  { q: "How is a diamond ring valued?", a: "The diamond is valued on its carat weight, cut, colour and clarity, and the setting on its metal and weight. A ring by a well-known jeweller can be worth more than the sum of the two." },
  { q: "What do I need to tell you?", a: "The carat weight if you know it, any grading certificate, the metal or hallmark of the band, the maker, and whether you have the receipt or an insurance valuation." },
  { q: "Why is the offer lower than my insurance valuation?", a: "An insurance valuation estimates the cost of buying a new replacement at retail. A resale offer reflects what a buyer can sell the ring for second-hand, which is normally a good deal lower." },
  { q: "Are lab-grown diamonds worth the same?", a: "No. Lab-grown diamonds resell for much less than natural diamonds of the same grade. Tell us if you know which yours is; the certificate will say." },
];

export default function Page() {
  return (
    <MetalShell crumbs={[{ href: "/sell-jewellery", label: "Sell jewellery" }, { label: "Sell a diamond ring" }]} eyebrow={area} h1="Sell a diamond ring" art={<RingArt />} faqs={faqs} faqTitle="Common questions"
      intro={<>Sell a diamond ring for an offer based on the stone and its setting. Tell us what you know about the diamond and we&apos;ll come back to you, or you can borrow against the ring instead.</>}>
      <h2>What decides the price</h2>
      <ul>
        <li><strong>The stone:</strong> carat weight, cut, colour and clarity. Natural and lab-grown diamonds are valued very differently.</li>
        <li><strong>The setting:</strong> the metal and its weight. Look for a hallmark inside the band: 750 is 18ct gold and 950 is platinum.</li>
        <li><strong>The maker:</strong> rings by well-known houses sell for more, especially with the box and papers.</li>
        <li><strong>Paperwork:</strong> a grading certificate, receipt or insurance valuation.</li>
      </ul>
      <h2>What to send us</h2>
      <p>Describe the ring in the form: stone size, metal, maker and any documents. If you only know that it is, say, an 18ct gold ring with one diamond, send that. A figure given before the ring has been examined is provisional.</p>
      <p>Plain bands with no stones are valued by weight: see the <Link href="/gold-price-calculator">gold calculator</Link>. Also: <Link href="/sell-engagement-ring">sell an engagement ring</Link> · <Link href="/sell-jewellery">sell other jewellery</Link>.</p>
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}
