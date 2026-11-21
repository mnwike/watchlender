import type { Metadata } from "next";
import Link from "next/link";
import { GOLD_COINS, gbp, pricePerGram, priceDate, refPerOz } from "@/lib/metals";
import { MetalForm, MetalLinks, PriceSource } from "@/components/MetalPages";

const perG = pricePerGram(refPerOz("gold"));
const full = GOLD_COINS[0].fineGrams * perG;
const half = GOLD_COINS[1].fineGrams * perG;

export const metadata: Metadata = {
  title: "Gold sovereign value: full and half sovereign price",
  description: `The gold in a full sovereign was worth ${gbp(full)} and a half sovereign ${gbp(half)} at the spot price on ${priceDate()}. How sovereign values are worked out, and how to sell.`,
  alternates: { canonical: "/gold-sovereign-value/" },
};

const faqs = [
  { q: "How much is a gold sovereign worth?", a: `A full sovereign contains 7.32 grams of pure gold. At the reference spot price on ${priceDate()} that gold was worth ${gbp(full)}. A coin in good condition usually sells for a little more than its gold value, and rare dates can be worth much more.` },
  { q: "How much is a half sovereign worth?", a: `A half sovereign contains 3.66 grams of pure gold, worth ${gbp(half)} at the spot price on ${priceDate()}.` },
  { q: "What is a sovereign made of?", a: "Sovereigns are 22 carat gold (916.7 parts per thousand). A full sovereign weighs 7.98 grams in total, of which 7.32 grams is pure gold." },
  { q: "Are some sovereigns worth more than their gold?", a: "Yes. Older coins, scarce dates and mint marks, proof coins and coins in exceptional condition can carry a collector premium well above the gold value. Tell us the date and monarch when you enquire." },
];

export default function Page() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/sell-gold">Gold and precious metals</Link> / Gold sovereign value</nav>
      <div className="page-head">
        <span className="eyebrow">Reference price · {priceDate()}</span>
        <h1>Gold sovereign value</h1>
        <p>The gold in a full sovereign was worth {gbp(full)} at the spot price on {priceDate()}, and a half sovereign {gbp(half)}. Here is how those figures are worked out, and what can make a coin worth more.</p>
      </div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <div className="table-scroll"><table className="compare"><thead><tr><th>Coin</th><th>Fine gold</th><th>Gold value at spot</th></tr></thead>
            <tbody>{GOLD_COINS.map((c) => <tr key={c.name}><td>{c.name}</td><td>{c.fineGrams.toFixed(2)} g</td><td>{gbp(c.fineGrams * perG)}</td></tr>)}</tbody></table></div>
          <PriceSource />
          <h2>How the value is worked out</h2>
          <p>A coin&apos;s gold value is its pure gold content multiplied by the gold price per gram, which was {gbp(perG)} on {priceDate()}. See the <Link href="/gold-price-per-gram">gold price per gram</Link> for other purities, or use the <Link href="/gold-price-calculator">gold calculator</Link>.</p>
          <h2>What can add to the value</h2>
          <ul>
            <li>Date and mint mark: some years and mints are scarce.</li>
            <li>Condition: coins with sharp detail and little wear are worth more.</li>
            <li>Proof coins and boxed sets, especially with their certificates.</li>
          </ul>
          <h2>Selling sovereigns and gold coins</h2>
          <MetalLinks />
          <section className="faq" style={{ padding: 0 }}>
            <h2>Sovereign questions</h2>
            {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        </div>
        <aside className="sticky" id="enquire"><MetalForm /></aside>
      </div>
    </div>
  );
}
