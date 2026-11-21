import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NICKNAMES, getNickname } from "@/data/nicknames";
import { WATCHES } from "@/lib/catalogue";
import { SITE } from "@/lib/site";
import WatchCard from "@/components/WatchCard";
import LeadForm from "@/components/LeadForm";
import { ThreeWaysLinks } from "@/components/ThreeWays";

type P = Promise<{ nickname: string }>;
export const dynamicParams = false;
export const generateStaticParams = () => NICKNAMES.map((n) => ({ nickname: n.slug }));

const watchesFor = (refs: string[]) => refs.map((r) => WATCHES.find((w) => w.brandSlug === "rolex" && w.referenceDisplay === r)).filter((w) => !!w);

export async function generateMetadata({ params }: { params: P }): Promise<Metadata> {
  const n = getNickname((await params).nickname);
  if (!n) return {};
  return {
    title: `Rolex ${n.name}: reference numbers and how to sell or borrow against one`,
    description: `What the Rolex ${n.name} is (${n.model} ${n.refs.join(", ")}), how to identify one, and your options if you own one: sell now, list or borrow.`,
    alternates: { canonical: `/rolex/${n.slug}/` },
  };
}

export default async function NicknamePage({ params }: { params: P }) {
  const n = getNickname((await params).nickname);
  if (!n) notFound();
  const watches = watchesFor(n.refs);
  const faqs = [
    { q: `What is the Rolex ${n.name}?`, a: n.summary },
    { q: `What is the reference number of the Rolex ${n.name}?`, a: `${n.refs.join(", ")}.${n.otherRefs ? ` ${n.otherRefs}` : ""}` },
    { q: `Is ${n.name} an official Rolex name?`, a: `No. It is a collectors' nickname. Rolex identifies the watch by model name and reference number.` },
    { q: `How do I sell my Rolex ${n.name}?`, a: `Tell us the reference, condition and whether you have the box and papers using the form on this page. You can sell it to us, list it at your own price, or ${SITE.loansMode === "waitlist" ? "register interest in borrowing against it" : "borrow against it"}.` },
  ];
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/rolex-nicknames">Rolex nicknames</Link> / {n.name}</nav>
      <div className="page-head">
        <span className="eyebrow">Rolex {n.model}</span>
        <h1>Rolex {n.name}</h1>
        <p>{n.summary}</p>
      </div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <h2>How to identify a Rolex {n.name}</h2>
          <ul>{n.identify.map((t) => <li key={t}>{t}</li>)}</ul>
          <h2>Rolex {n.name} reference numbers</h2>
          {n.otherRefs && <p>{n.otherRefs}</p>}
          <div className="grid">{watches.map((w) => <WatchCard key={w.id} watch={w} />)}</div>
          <h2>Own a Rolex {n.name}?</h2>
          <p>You have three options with us, in one place.</p>
          <ThreeWaysLinks />
          <p>Not sure what yours is worth? <Link href="/watch-valuation">Request a valuation</Link>.</p>
          <section className="faq" style={{ padding: 0 }}>
            <h2>Rolex {n.name} questions</h2>
            {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
          {n.related && <p>Related nicknames: {n.related.map((s, i) => { const r = getNickname(s)!; return <span key={s}>{i > 0 ? " · " : ""}<Link href={`/rolex/${s}`}>Rolex {r.name}</Link></span>; })} · <Link href="/rolex-nicknames">all Rolex nicknames</Link></p>}
          <p className="note">{SITE.name} is independent and not affiliated with Rolex. Nicknames are informal collector terms.</p>
        </div>
        <aside className="sticky" id="enquire"><LeadForm defaultIntent="sell" loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} /></aside>
      </div>
    </div>
  );
}
