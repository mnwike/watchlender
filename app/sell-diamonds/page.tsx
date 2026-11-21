import type { Metadata } from "next";
import Link from "next/link";
import { MetalShell, area, RingArt } from "@/components/GoldExtras";
import { MetalLinks } from "@/components/MetalPages";

export const metadata: Metadata = {
  title: "Sell diamonds: loose stones and diamond jewellery",
  description: `Sell loose diamonds or diamond jewellery. What decides the price, why a certificate matters, and how to get an offer. ${area}.`,
  alternates: { canonical: "/sell-diamonds/" },
};

const faqs = [
  { q: "How much can I sell a diamond for?", a: "It depends on the four Cs and whether the stone is natural. A resale offer is normally well below the retail price of a similar new stone, because retail includes the jeweller's margin and VAT." },
  { q: "Do I need a certificate to sell a diamond?", a: "No, but it helps a great deal. Without one the stone has to be assessed in person, and any earlier figure is provisional." },
  { q: "Do you buy small diamonds?", a: "Small stones are usually valued as part of the piece they are set in. Tell us what you have." },
  { q: "How do I know if my diamond is lab-grown?", a: "The certificate will say. Some lab-grown stones are also laser-inscribed on the edge. If you are unsure, it can be tested." },
];

export default function Page() {
  return (
    <MetalShell crumbs={[{ href: "/sell-jewellery", label: "Sell jewellery" }, { label: "Sell diamonds" }]} eyebrow={area} h1="Sell diamonds" art={<RingArt />} faqs={faqs} faqTitle="Common questions"
      intro={<>Sell loose diamonds or diamond jewellery. Tell us what you know about the stones and we will come back to you with an offer, confirmed once they have been examined.</>}>
      <h2>What decides a diamond&apos;s price</h2>
      <ul>
        <li><strong>Carat:</strong> the weight of the stone. Price per carat rises with size.</li>
        <li><strong>Cut, colour and clarity:</strong> how well it is cut, how colourless it is and how free of marks.</li>
        <li><strong>Natural or lab-grown:</strong> lab-grown diamonds resell for much less than natural ones.</li>
        <li><strong>Certificate:</strong> a grading report from a recognised laboratory lets a buyer price the stone with confidence.</li>
      </ul>
      <h2>What to send us</h2>
      <p>The certificate details if you have one. If not, tell us the carat weight if you know it, the shape, and what the stone is set in. Small stones in a piece of jewellery are usually valued together with the piece.</p>
      <p>Related: <Link href="/sell-diamond-ring">sell a diamond ring</Link> · <Link href="/sell-engagement-ring">sell an engagement ring</Link> · <Link href="/sell-jewellery">sell jewellery</Link></p>
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}
