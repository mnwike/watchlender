import type { Metadata } from "next";
import Link from "next/link";
import { MetalShell, area, RingArt } from "@/components/GoldExtras";
import { MetalLinks } from "@/components/MetalPages";

export const metadata: Metadata = {
  title: "Sell an engagement ring: how it is valued and what to expect",
  description: `Sell an engagement ring you no longer need. How rings are valued, what paperwork helps, and how to get an offer or borrow against it. ${area}.`,
  alternates: { canonical: "/sell-engagement-ring/" },
};

const faqs = [
  { q: "How much can I sell my engagement ring for?", a: "It depends on the centre stone (its carat weight, cut, colour and clarity), the metal and weight of the setting, and the maker. A resale offer is normally well below the original retail price, because that price included the shop’s margin and VAT." },
  { q: "Do I need the certificate?", a: "No, but a grading certificate from a recognised laboratory such as GIA makes a diamond much easier to value and usually improves the offer. The original receipt and box help too." },
  { q: "Can I sell a ring without a diamond certificate?", a: "Yes. The stone can be assessed in person. Any figure given before that is provisional." },
  { q: "Would I be better off borrowing against it?", a: "Only if you want the ring back and are confident you can repay. If you do not, selling avoids the cost of borrowing." },
];

export default function Page() {
  return (
    <MetalShell crumbs={[{ href: "/sell-jewellery", label: "Sell jewellery" }, { label: "Sell an engagement ring" }]} eyebrow={area} h1="Sell an engagement ring" art={<RingArt />} faqs={faqs} faqTitle="Common questions"
      intro={<>Sell an engagement ring you no longer need, whatever the reason. Tell us about the ring and we&apos;ll come back to you with an offer, or you can borrow against it and keep it.</>}>
      <h2>What decides the price</h2>
      <ul>
        <li><strong>The stone:</strong> carat weight, cut, colour and clarity. Natural and lab-grown diamonds are valued very differently.</li>
        <li><strong>The setting:</strong> the metal and its weight. Look for a hallmark inside the band: 750 is 18ct gold and 950 is platinum.</li>
        <li><strong>The maker:</strong> rings by well-known houses sell for more, especially with the box and papers.</li>
        <li><strong>Paperwork:</strong> a grading certificate, receipt or insurance valuation.</li>
      </ul>
      <h2>What to send us</h2>
      <p>Describe the ring in the form: stone size, metal, maker and any documents. If you only know that it is, say, an 18ct gold ring with one diamond, send that. A figure given before the ring has been examined is provisional.</p>
      <p>Plain bands with no stones are valued by weight: see the <Link href="/gold-price-calculator">gold calculator</Link>. Also: <Link href="/sell-diamond-ring">sell a diamond ring</Link> · <Link href="/sell-jewellery">sell other jewellery</Link>.</p>
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}
