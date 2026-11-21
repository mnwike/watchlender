import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import PageImage from "@/components/PageImage";
import { SITE } from "@/lib/site";
import { ThreeWaysTable } from "@/components/ThreeWays";

const waitlist = SITE.loansMode === "waitlist";
export const metadata: Metadata = {
  title: "Pawn my watch or Rolex: how it works and the alternatives",
  description: `Thinking of pawning a Rolex or other luxury watch? How pawning works, what to ask, and how it compares with selling or listing. ${SITE.area}.`,
  alternates: { canonical: "/pawn-my-watch/" },
};

const faqs = [
  { q: "What does it mean to pawn a watch?", a: "Pawning is borrowing against the watch. You leave it with the lender as security, receive a loan, and get the watch back when you repay the loan and its charges within the agreed term." },
  { q: "Can I pawn a Rolex?", a: "Rolex watches are among the most commonly accepted because they are easy to value and resell. The lender will want to inspect and authenticate the watch first, and box and papers help." },
  { q: "What happens if I cannot repay?", a: "The lender can sell the watch to recover what is owed. The notice you must be given and what happens to any surplus are set out in the credit agreement and in consumer credit law." },
  { q: "Is pawning better than selling?", a: "It depends on whether you want the watch back and are confident of repaying. If not, selling avoids the cost of borrowing. If you can wait for a buyer, listing may achieve a higher price." },
];

export default function Pawn() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/watch-loans">Watch loans</Link> / Pawn my watch</nav>
      <div className="page-head">
        <span className="eyebrow">{SITE.area}</span>
        <h1>Pawn my watch</h1>
        <p>Pawning a watch means borrowing against it and getting it back when you repay. {waitlist ? "We are not offering loans yet, but you can register your interest, or compare selling and listing today." : "Here is how it works with us, and how it compares with selling or listing."}</p>
      </div>
      <PageImage name="borrow" position="50% 60%" />
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <h2>Pawn, sell or list: compare first</h2>
          <ThreeWaysTable />
          <h2>How pawning a watch works</h2>
          <p>The watch is inspected and valued, and you are offered a loan for part of that value. If you accept, you sign a credit agreement and the watch is stored securely until you repay. Our guide to <Link href="/guides/how-watch-loans-work">how loans against watches work</Link> covers the costs and the questions to ask any lender.</p>
          {waitlist && <p className="note">Registering your interest is not an application for credit and no offer of credit is made on this page.</p>}
          {SITE.fcaStatement && <p>{SITE.fcaStatement}</p>}
          <section className="faq" style={{ padding: 0 }}>
            <h2>Pawning a watch: common questions</h2>
            {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        </div>
        <aside className="sticky" id="enquire"><LeadForm defaultIntent="loan" loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} /></aside>
      </div>
    </div>
  );
}
