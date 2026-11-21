import Link from "next/link";
import { getNickname, nickBrand, nickUrl, type Nickname } from "@/data/nicknames";
import { WATCHES } from "@/lib/catalogue";
import { SITE } from "@/lib/site";
import WatchCard from "@/components/WatchCard";
import LeadForm from "@/components/LeadForm";
import { ThreeWaysLinks } from "@/components/ThreeWays";

const watchesFor = (n: Nickname) => n.refs.map((r) => WATCHES.find((w) => w.brand === nickBrand(n) && w.referenceDisplay === r)).filter((w) => !!w);

export function nicknameMetadata(n: Nickname) {
  const B = nickBrand(n);
  return {
    title: `${B} ${n.name}: reference numbers and how to sell or borrow against one`,
    description: `What the ${B} ${n.name} is (${n.model} ${n.refs.slice(0, 3).join(", ")}), how to identify one, and your options if you own one: sell now, list or borrow.`,
    alternates: { canonical: `${nickUrl(n)}/` },
  };
}

export default function NicknameView({ n }: { n: Nickname }) {
  const B = nickBrand(n);
  const watches = watchesFor(n);
  const faqs = [
    { q: `What is the ${B} ${n.name}?`, a: n.summary },
    { q: `What is the reference number of the ${B} ${n.name}?`, a: `${n.refs.join(", ")}.${n.otherRefs ? ` ${n.otherRefs}` : ""}` },
    { q: `Is ${n.name} an official ${B} name?`, a: B === "Omega" && n.slug === "moonwatch" ? `Yes, in this case. Omega uses the name Moonwatch itself, alongside the reference number.` : `It began as a collectors' nickname. ${B} identifies the watch by model name and reference number.` },
    { q: `How do I sell my ${B} ${n.name}?`, a: `Tell us the reference, condition and whether you have the box and papers using the form on this page. You can sell it to us, list it at your own price, or ${SITE.loansMode === "waitlist" ? "register interest in borrowing against it" : "borrow against it"}.` },
  ];
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/rolex-nicknames">Watch nicknames</Link> / {n.name}</nav>
      <div className="page-head">
        <span className="eyebrow">{B} {n.model}</span>
        <h1>{B} {n.name}</h1>
        <p>{n.summary}</p>
      </div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <h2>How to identify {/^[AEIOU]/.test(B) ? "an" : "a"} {B} {n.name}</h2>
          <ul>{n.identify.map((t) => <li key={t}>{t}</li>)}</ul>
          <h2>{B} {n.name} reference numbers</h2>
          {n.otherRefs && <p>{n.otherRefs}</p>}
          <div className="grid">{watches.map((w) => <WatchCard key={w.id} watch={w} />)}</div>
          <h2>Own {/^[AEIOU]/.test(B) ? "an" : "a"} {B} {n.name}?</h2>
          <p>You have three options with us, in one place.</p>
          <ThreeWaysLinks />
          <p>Not sure what yours is worth? <Link href="/watch-valuation">Request a valuation</Link>.</p>
          <section className="faq" style={{ padding: 0 }}>
            <h2>{B} {n.name} questions</h2>
            {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
          {n.related && <p>Related nicknames: {n.related.map((s, i) => { const r = getNickname(s, B)!; return <span key={s}>{i > 0 ? " · " : ""}<Link href={nickUrl(r)}>{B} {r.name}</Link></span>; })} · <Link href="/rolex-nicknames">all watch nicknames</Link></p>}
          <p className="note">{SITE.name} is independent and not affiliated with {B}. Nicknames are informal collector terms.</p>
        </div>
        <aside className="sticky" id="enquire"><LeadForm defaultIntent="sell" loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} /></aside>
      </div>
    </div>
  );
}
