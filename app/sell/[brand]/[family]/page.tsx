import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAMILIES, getFamily } from "@/lib/catalogue";
import { NICKNAMES } from "@/data/nicknames";
import { SITE } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import WatchCard from "@/components/WatchCard";
import PageImage from "@/components/PageImage";
import { ThreeWaysTable } from "@/components/ThreeWays";

type P = Promise<{ brand: string; family: string }>;
export const dynamicParams = false;
export const generateStaticParams = () => FAMILIES.map((f) => ({ brand: f.brand.slug, family: f.slug }));

export async function generateMetadata({ params }: { params: P }): Promise<Metadata> {
  const { brand, family } = await params;
  const f = getFamily(brand, family);
  if (!f) return {};
  const name = `${f.brand.name} ${f.family}`;
  return {
    title: `Sell my ${name}: sell now, list or borrow`,
    description: `Sell your ${name} now, list it at your own price, or borrow against it. References we cover: ${f.watches.slice(0, 5).map((w) => w.referenceDisplay).join(", ")}. ${SITE.area}.`,
    alternates: { canonical: `/sell/${f.brand.slug}/${f.slug}/` },
  };
}

export default async function SellFamily({ params }: { params: P }) {
  const { brand, family } = await params;
  const f = getFamily(brand, family);
  if (!f) notFound();
  const name = `${f.brand.name} ${f.family}`;
  const refs = f.watches.map((w) => w.referenceDisplay);
  const sizes = [...new Set(f.watches.map((w) => w.sizeMm).filter((x): x is number => x != null))].sort((a, b) => a - b);
  const materials = [...new Set(f.watches.map((w) => w.material))];
  const nicks = f.brand.slug === "rolex" ? NICKNAMES.filter((n) => n.refs.some((r) => refs.includes(r))) : [];
  const faqs = [
    { q: `How do I sell my ${name}?`, a: `Tell us the reference, condition and whether you have the box and papers using the form on this page. We review the details and come back to you with an offer, which is confirmed once the watch has been inspected.` },
    { q: `Which ${name} references do you cover?`, a: `Our catalogue currently lists ${refs.length} ${name} ${refs.length === 1 ? "reference" : "references"}: ${refs.slice(0, 12).join(", ")}${refs.length > 12 ? " and others" : ""}. If yours is not listed, describe it in the form.` },
    { q: `What affects the value of a ${name}?`, a: `The exact reference and dial, condition and whether the case has been polished, box and papers, service history and current demand.${materials.length > 1 ? ` The ${f.family} is made in ${materials.slice(0, 4).join(", ").toLowerCase()}, and the metal makes a large difference.` : ""}` },
    { q: `Can I keep my ${f.family} and borrow against it?`, a: SITE.loansMode === "waitlist" ? `We are preparing a loan service secured on watches. Choose "Borrow" in the form to register your interest. This is not an offer of credit.` : `Yes. Choose "Borrow" in the form and we will explain how a loan secured on your watch would work.` },
  ];
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/sell-my-watch">Sell my watch</Link> / <Link href={`/sell/${f.brand.slug}`}>{f.brand.name}</Link> / {f.family}</nav>
      <div className="page-head">
        <span className="eyebrow">{SITE.area}</span>
        <h1>Sell my {name}</h1>
        <p>Sell your {name} now, list it at your own price, or borrow against it. We cover {refs.length} {f.family} {refs.length === 1 ? "reference" : "references"}{sizes.length ? `, from ${sizes[0]} mm${sizes.length > 1 ? ` to ${sizes[sizes.length - 1]} mm` : ""}` : ""}.</p>
      </div>
      <PageImage name="sell" position="80% 60%" />
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <h2>Your three options</h2>
          <ThreeWaysTable />
          {nicks.length > 0 && <p>Know yours by a nickname? {nicks.map((n, i) => <span key={n.slug}>{i > 0 ? " · " : ""}<Link href={`/rolex/${n.slug}`}>Rolex {n.name}</Link></span>)}</p>}
          <section className="faq" style={{ padding: 0 }}>
            <h2>Selling a {name}: common questions</h2>
            {faqs.map((x) => <details key={x.q}><summary>{x.q}</summary><p>{x.a}</p></details>)}
          </section>
        </div>
        <aside className="sticky" id="enquire"><LeadForm defaultIntent="sell" loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} /></aside>
      </div>
      <section style={{ paddingTop: 24 }}>
        <div className="section-head"><h2>Find your {name}</h2><Link href={`/watches/${f.brand.slug}`}>All {f.brand.name} references</Link></div>
        <div className="grid">{f.watches.map((w) => <WatchCard key={w.id} watch={w} />)}</div>
      </section>
    </div>
  );
}
