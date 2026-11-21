import type { Metadata } from "next";
import Link from "next/link";
import { MetalForm, MetalLinks } from "@/components/MetalPages";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell jewellery: diamond rings, engagement rings and gold",
  description: `Sell your jewellery, diamond ring or engagement ring. Tell us what you have for an offer, or borrow against it. ${SITE.area}.`,
  alternates: { canonical: "/sell-jewellery/" },
};

const faqs = [
  { q: "How do I sell my jewellery?", a: "Tell us what the piece is, any hallmarks, the maker if known, and whether you have certificates or receipts. We review the details and come back to you with an offer, confirmed once the piece has been examined." },
  { q: "How is a diamond or engagement ring valued?", a: "The setting is valued by its metal, and the stone by its carat weight, cut, colour and clarity. A grading certificate from a recognised laboratory makes the stone much easier to value." },
  { q: "Why is the offer lower than the insurance valuation?", a: "Insurance valuations estimate the cost of replacing a piece new at retail. A resale offer reflects what a buyer can sell it for second-hand, which is normally a good deal lower." },
  { q: "Is signed jewellery worth more?", a: "Pieces by well-known houses usually sell for more than their metal and stones alone, especially with the original box and papers. Tell us the maker in the form." },
];

export default function Page() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / Sell jewellery</nav>
      <div className="page-head">
        <span className="eyebrow">{SITE.area}</span>
        <h1>Sell jewellery</h1>
        <p>Sell a diamond ring, an engagement ring, signed jewellery or gold you no longer wear. Tell us what you have and we&apos;ll come back to you with an offer, or you can borrow against it instead.</p>
      </div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <h2>What we need to know</h2>
          <ul>
            <li>What the piece is, and the metal or hallmark if you can see one.</li>
            <li>For diamonds and gemstones: the carat weight and any grading certificate.</li>
            <li>The maker, if it is signed, and whether you have the box and papers.</li>
            <li>Its condition, and a rough weight if it is mainly gold.</li>
          </ul>
          <h2>Mainly gold?</h2>
          <p>Plain gold jewellery is usually valued by weight. Use the <Link href="/gold-price-calculator">gold calculator</Link> to see its metal value, or go to <Link href="/sell-gold">sell gold</Link>.</p>
          <h2>Your options</h2>
          <MetalLinks />
          <section className="faq" style={{ padding: 0 }}>
            <h2>Selling jewellery: common questions</h2>
            {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        </div>
        <aside className="sticky" id="enquire"><MetalForm /></aside>
      </div>
    </div>
  );
}
