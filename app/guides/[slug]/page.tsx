import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "@/data/guides";
import { SITE } from "@/lib/site";
import { ThreeWaysLinks } from "@/components/ThreeWays";

type P = Promise<{ slug: string }>;
export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: { params: P }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  return g ? { title: g.title, description: g.description, alternates: { canonical: `/guides/${g.slug}/` } } : {};
}

export default async function GuidePage({ params }: { params: P }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description, publisher: { "@type": "Organization", name: SITE.name }, mainEntityOfPage: `${SITE.url}/guides/${g.slug}/` };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / {g.title}</nav>
      <article className="prose" style={{ paddingBottom: 10 }}>
        <div className="page-head" style={{ paddingInline: 0 }}><h1>{g.title}</h1><p>{g.intro}</p></div>
        {g.sections.map((s) => (
          <section key={s.h} style={{ padding: 0 }}>
            <h2>{s.h}</h2>
            {s.p?.map((t) => <p key={t}>{t}</p>)}
            {s.list && <ul>{s.list.map((t) => <li key={t}>{t}</li>)}</ul>}
          </section>
        ))}
        <p className="note" style={{ marginTop: 24 }}>This guide is general information, not financial or legal advice.</p>
      </article>
      <h2 style={{ marginTop: 24 }}>Sell now, list or borrow, in one place</h2>
      <ThreeWaysLinks />
      <p>Other guides: {GUIDES.filter((x) => x.slug !== g.slug).map((x, i) => <span key={x.slug}>{i > 0 ? " · " : ""}<Link href={`/guides/${x.slug}`}>{x.title}</Link></span>)}</p>
    </div>
  );
}
