import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANDS, getBrand, watchesByBrand } from "@/lib/catalogue";
import { BRAND_NOTES } from "@/data/brand-notes";
import { SITE } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import WatchCard from "@/components/WatchCard";
import { ThreeWaysTable } from "@/components/ThreeWays";

type P = Promise<{ brand: string }>;
export const dynamicParams = false;
export const generateStaticParams = () => BRANDS.map((b) => ({ brand: b.slug }));

export async function generateMetadata({ params }: { params: P }): Promise<Metadata> {
  const b = getBrand((await params).brand);
  if (!b) return {};
  return {
    title: `Sell my ${b.name} watch: sell now, list or borrow`,
    description: `Sell your ${b.name} watch now, list it at your own price, or borrow against it, all in one place. ${SITE.area}.`,
    alternates: { canonical: `/sell/${b.slug}/` },
  };
}

export default async function SellBrand({ params }: { params: P }) {
  const b = getBrand((await params).brand);
  if (!b) notFound();
  const watches = watchesByBrand(b.slug);
  const faqs = [
    { q: `How do I sell my ${b.name} watch?`, a: `Tell us the model, condition and whether you have the box and papers using the form on this page. We review the details and come back to you with an offer, which is confirmed once the watch has been inspected.` },
    { q: `Can I list my ${b.name} at my own price instead?`, a: `Yes. Choose "List for sale" in the form and give your asking price. We review every listing before it is published.` },
    { q: `Can I borrow against my ${b.name} rather than sell it?`, a: SITE.loansMode === "waitlist" ? `We are preparing a loan service secured on watches. Choose "Borrow" in the form to register your interest. This is not an offer of credit.` : `Yes. Choose "Borrow" in the form and we will explain how a loan secured on your watch would work.` },
    { q: `Do I need the box and papers to sell a ${b.name}?`, a: `No, but a complete set is easier to sell and usually worth more. A watch without papers is authenticated on its own merits when it is inspected.` },
  ];
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/sell-my-watch">Sell my watch</Link> / {b.name}</nav>
      <div className="page-head">
        <span className="eyebrow">{SITE.area}</span>
        <h1>Sell my {b.name} watch</h1>
        <p>Sell your {b.name} now, list it at your own price, or borrow against it. Three options in one place, so you can pick the one that suits you.</p>
      </div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          {BRAND_NOTES[b.slug] && <p>{BRAND_NOTES[b.slug]}</p>}
          <h2>Your three options</h2>
          <ThreeWaysTable />
          <h2>{b.name} models we look at</h2>
          <p>{b.families.join(", ")}, and other {b.name} models. If yours is not in <Link href={`/watches/${b.slug}`}>our {b.name} catalogue</Link> yet, describe it in the form.</p>
          <section className="faq" style={{ padding: 0 }}>
            <h2>Selling a {b.name}: common questions</h2>
            {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        </div>
        <aside className="sticky" id="enquire"><LeadForm defaultIntent="sell" loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} /></aside>
      </div>
      <section style={{ paddingTop: 24 }}>
        <div className="section-head"><h2>Find your {b.name}</h2><Link href={`/watches/${b.slug}`}>All {b.name} references</Link></div>
        <div className="grid">{watches.slice(0, 8).map((w) => <WatchCard key={w.id} watch={w} />)}</div>
      </section>
    </div>
  );
}
