import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WATCHES, fullName, getWatch, related, type Watch } from "@/lib/catalogue";
import { SITE } from "@/lib/site";
import WatchArt from "@/components/WatchArt";
import WatchCard from "@/components/WatchCard";
import LeadForm from "@/components/LeadForm";
import { listingsForWatch } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";

type P = Promise<{ brand: string; slug: string }>;
export const dynamicParams = false;
export const generateStaticParams = () => WATCHES.map((w) => ({ brand: w.brandSlug, slug: w.slug }));

export async function generateMetadata({ params }: { params: P }): Promise<Metadata> {
  const { brand, slug } = await params;
  const w = getWatch(brand, slug);
  if (!w) return {};
  return {
    title: `Sell or borrow against your ${fullName(w)}`,
    description: `${fullName(w)}: ${[w.sizeMm ? `${w.sizeMm} mm` : null, w.material.toLowerCase(), `${w.dial.toLowerCase()} dial`, w.movement || null].filter(Boolean).join(", ")}. Sell it or register for a loan against it. ${SITE.area}.`,
    alternates: { canonical: w.url },
  };
}

function faqs(w: Watch) {
  const name = fullName(w);
  return [
    { q: `How do I sell my ${name}?`, a: `Send us the enquiry form on this page with the condition of your ${w.model} and whether you have the box and papers. We review it and contact you with an offer, which is confirmed once the watch has been inspected.` },
    { q: `Can I borrow against my ${w.brand} ${w.model} instead of selling it?`, a: SITE.loansMode === "waitlist" ? `We are preparing a loan service secured on watches such as the ${w.referenceDisplay}. Choose "Borrow against it" in the form to register your interest. This is not an offer of credit.` : `Yes. Choose "Borrow against it" in the form and we will explain how a loan secured on your watch would work before you commit to anything.` },
    { q: `How do I check that my watch is reference ${w.referenceDisplay}?`, a: `The reference is printed on the warranty card or papers and is usually engraved on the case. This reference has a ${w.sizeMm ? `${w.sizeMm} mm ` : ""}${w.material.toLowerCase()} case, a ${w.dial.toLowerCase()} dial${w.dials.length > 1 ? ` (other dials: ${w.dials.slice(1).join(", ").toLowerCase()})` : ""}${w.movement ? ` and uses ${w.movement}` : ""}. If yours differs, tell us in the form.` },
    { q: "What affects how much my watch is worth?", a: "Condition, service history, whether the original box and papers are present, the year, and current demand for the reference. Any figure we give before inspection is provisional." },
  ];
}

export default async function WatchPage({ params }: { params: P }) {
  const { brand, slug } = await params;
  const w = getWatch(brand, slug);
  if (!w) notFound();
  const name = fullName(w);
  const qa = faqs(w);
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Watches", item: `${SITE.url}/watches/` },
        { "@type": "ListItem", position: 2, name: w.brand, item: `${SITE.url}/watches/${w.brandSlug}/` },
        { "@type": "ListItem", position: 3, name: `${w.model} ${w.referenceDisplay}`, item: `${SITE.url}${w.url}` },
      ],
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qa.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  const specs: [string, string][] = [
    ["Brand", w.brand], ["Collection", w.family], ["Model", w.model], ["Reference", w.referenceDisplay],
    ...(w.sizeMm ? ([["Case size", `${w.sizeMm} mm`]] as [string, string][]) : []),
    ["Case material", w.material], [w.dials.length > 1 ? "Dial options" : "Dial", w.dials.join(", ")], ...(w.bezel ? ([["Bezel", w.bezel]] as [string, string][]) : []), ...(w.movement ? ([["Movement", w.movement]] as [string, string][]) : []),
  ];
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/watches">Watches</Link> / <Link href={`/watches/${w.brandSlug}`}>{w.brand}</Link> / {w.model} {w.referenceDisplay}
      </nav>
      <div className="page-head">
        <span className="eyebrow">{w.brand} · {w.family}</span>
        <h1>{w.model} <span style={{ whiteSpace: "nowrap" }}>{w.referenceDisplay}</span></h1>
        <p>Own this watch? Sell it, or use it as security for a loan. Tell us about yours and we&apos;ll come back to you.</p>
        <a className="btn primary mobile-cta" href="#enquire">Start my enquiry</a>
      </div>
      <div className="detail">
        <div>
          <div className="detail-art"><WatchArt watch={w} size={230} /><small>Illustration for identification only, not a photograph of this model.</small></div>
          <table className="specs"><tbody>{specs.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table>
          {w.source && <p style={{ fontSize: ".82rem", color: "var(--muted)", marginTop: -8 }}>Model, size, material and dial options checked against <a href={w.source.url} rel="nofollow noopener">{w.source.name}</a> on {w.source.checked}.</p>}
          <section className="faq" style={{ padding: "10px 0 0" }}>
            <h2>Selling or borrowing against a {w.brand} {w.referenceDisplay}</h2>
            {qa.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        </div>
        <aside className="sticky" id="enquire">
          <LeadForm watchId={w.id} watchLabel={name} loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} />
        </aside>
      </div>
      {listingsForWatch(w.id).length > 0 && (
        <section style={{ paddingTop: 24, paddingBottom: 0 }}>
          <div className="section-head"><h2>{w.brand} {w.referenceDisplay} for sale</h2><Link href="/for-sale">All watches for sale</Link></div>
          <div className="grid">{listingsForWatch(w.id).map((l) => <ListingCard key={l.id} listing={l} />)}</div>
        </section>
      )}
      <section style={{ paddingTop: 24 }}>
        <div className="section-head"><h2>More {w.brand} watches</h2><Link href={`/watches/${w.brandSlug}`}>All {w.brand}</Link></div>
        <div className="grid">{related(w).map((r) => <WatchCard key={r.id} watch={r} />)}</div>
      </section>
    </div>
  );
}
