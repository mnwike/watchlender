import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { SITE } from "@/lib/site";
import { ThreeWaysLinks } from "@/components/ThreeWays";

export const metadata: Metadata = {
  title: "Watch valuation: how much is my watch worth?",
  description: "Request a valuation for your luxury watch. Tell us the model and condition and we'll reply with an indicative figure, then choose to sell, list or borrow.",
  alternates: { canonical: "/watch-valuation/" },
};

const faqs = [
  { q: "How much is my watch worth?", a: "It depends on the exact reference, condition, whether you have the box and papers, originality and current demand. Send us those details and we will reply with an indicative figure." },
  { q: "Is the valuation instant?", a: "No. A person reviews your details and replies. We would rather give you a considered figure than an automated estimate." },
  { q: "Is the figure guaranteed?", a: "No. Any figure given before we have seen the watch is provisional and is confirmed only after inspection." },
  { q: "Do I have to sell after a valuation?", a: "No. Once you have a figure you can sell to us, list the watch at your own price, borrow against it, or do nothing." },
];

export default function Valuation() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="page-head">
        <span className="eyebrow">{SITE.area}</span>
        <h1>Watch valuation: how much is my watch worth?</h1>
        <p>Tell us which watch you have and what condition it is in. We&apos;ll reply with an indicative figure, and you can then decide whether to sell, list or borrow.</p>
      </div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <h2>What we need to value your watch</h2>
          <ul>
            <li>Brand, model and reference number. <Link href="/guides/find-your-watch-reference-number">How to find your reference number</Link>.</li>
            <li>Condition, and whether it has been polished or serviced.</li>
            <li>Whether you have the box and papers.</li>
            <li>The year, if you know it.</li>
          </ul>
          <p>Read more about <Link href="/guides/what-affects-watch-value">what affects a watch&apos;s value</Link>.</p>
          <h2>Once you have a figure</h2>
          <ThreeWaysLinks />
          <section className="faq" style={{ padding: 0 }}>
            <h2>Valuation questions</h2>
            {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        </div>
        <aside className="sticky" id="enquire"><LeadForm defaultIntent="value" loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} /></aside>
      </div>
    </div>
  );
}
