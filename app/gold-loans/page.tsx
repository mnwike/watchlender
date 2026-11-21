import type { Metadata } from "next";
import Link from "next/link";
import { MetalForm } from "@/components/MetalPages";
import { SITE } from "@/lib/site";

const waitlist = SITE.loansMode === "waitlist";
export const metadata: Metadata = {
  title: "Gold loans UK: borrow against gold and jewellery",
  description: `How loans against gold and jewellery work in the UK, what to ask a lender, and how borrowing compares with selling. ${SITE.area}.`,
  alternates: { canonical: "/gold-loans/" },
};

const faqs = [
  { q: "What is a gold loan?", a: "A loan secured on gold or jewellery. The lender holds your items, lends you part of their value, and returns them when you repay the loan and its charges within the agreed term. It is also called pawning." },
  { q: "How much can I borrow against gold?", a: "Lenders offer a proportion of the value of the items, based on their weight, purity and the gold price at the time. The proportion varies between lenders." },
  { q: "What happens if I do not repay?", a: "The lender can sell the items to recover what is owed. The notice you must be given and what happens to any surplus are set out in the credit agreement and in consumer credit law." },
  { q: "Should I borrow or sell?", a: "Borrow only if you want the items back and are confident of repaying. If not, selling avoids the cost of borrowing." },
];

export default function Page() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/sell-gold">Gold and precious metals</Link> / Gold loans</nav>
      <div className="page-head">
        <span className="eyebrow">{SITE.area}</span>
        <h1>Loans against gold and jewellery</h1>
        <p>A gold loan lets you raise money against gold or jewellery and get it back when you repay. {waitlist ? "We are not offering loans yet, but you can register your interest, or get an offer to sell today." : "Start an enquiry and we will explain how it works before you commit to anything."}</p>
      </div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <h2>How it works</h2>
          <ul>
            <li>Your items are tested, weighed and valued.</li>
            <li>You are offered a loan for part of that value.</li>
            <li>If you accept, you sign a credit agreement and the items are stored securely.</li>
            <li>You repay the loan and its charges within the term and the items are returned.</li>
          </ul>
          <p>To see what your gold is worth before you borrow, use the <Link href="/gold-price-calculator">gold calculator</Link>. If you would rather sell, see <Link href="/sell-gold">sell gold</Link> or <Link href="/sell-jewellery">sell jewellery</Link>. For watches, see <Link href="/watch-loans">loans against watches</Link>.</p>
          {waitlist && <p className="note">Registering your interest is not an application for credit and no offer of credit is made on this page.</p>}
          {SITE.fcaStatement && <p>{SITE.fcaStatement}</p>}
          <section className="faq" style={{ padding: 0 }}>
            <h2>Gold loans: common questions</h2>
            {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        </div>
        <aside className="sticky" id="enquire"><MetalForm intent="loan" /></aside>
      </div>
    </div>
  );
}
