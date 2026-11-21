import type { Metadata } from "next";
import Link from "next/link";
import MetalCalculator from "@/components/MetalCalculator";
import { MetalForm, MetalLinks, PriceSource, PriceTable, calcProps } from "@/components/MetalPages";

export const metadata: Metadata = {
  title: "Gold calculator UK: scrap gold, silver and platinum value",
  description: "Work out what your gold, silver or platinum is worth by weight and purity. Enter the weight and carat to see the metal value at the spot price.",
  alternates: { canonical: "/gold-price-calculator/" },
};

const faqs = [
  { q: "How do I calculate the value of scrap gold?", a: "Multiply the weight in grams by the purity (for example 0.375 for 9ct) and by the price of pure gold per gram. The calculator does this for you." },
  { q: "How much is my gold worth?", a: "It depends on the weight, the carat and the gold price on the day. Enter those in the calculator for the metal value. A buyer's offer will be below that figure." },
  { q: "How do I find the carat of my gold?", a: "Look for the hallmark: 375 is 9ct, 585 is 14ct, 750 is 18ct, 916 is 22ct and 999 is 24ct. If there is no hallmark the item needs testing." },
  { q: "Does the calculator include stones?", a: "No. It values the metal only. Weigh the item without stones if you can, since stones add weight that is not gold." },
];

export default function Page() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/sell-gold">Gold and precious metals</Link> / Calculator</nav>
      <div className="page-head">
        <h1>Gold calculator</h1>
        <p>Work out what your gold, silver or platinum is worth. Choose the metal and purity, enter the weight, and the calculator shows the value of the metal at the spot price.</p>
      </div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <MetalCalculator {...calcProps} />
          <h2>Reference gold prices by carat</h2>
          <PriceTable metal="gold" />
          <PriceSource />
          <p>See also the <Link href="/gold-price-per-gram">gold</Link>, <Link href="/silver-price-per-gram">silver</Link> and <Link href="/platinum-price-per-gram">platinum</Link> price per gram.</p>
          <h2>Once you know the value</h2>
          <MetalLinks />
          <section className="faq" style={{ padding: 0 }}>
            <h2>Calculator questions</h2>
            {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        </div>
        <aside className="sticky" id="enquire"><MetalForm intent="value" /></aside>
      </div>
    </div>
  );
}
