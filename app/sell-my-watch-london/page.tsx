import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { SITE } from "@/lib/site";
import { BRANDS } from "@/lib/catalogue";
import { ThreeWaysTable } from "@/components/ThreeWays";

export const metadata: Metadata = {
  title: "Sell my watch in London: sell now, list or borrow",
  description: "Sell your luxury watch in London. Get an offer, list it at your own price, or borrow against it, all in one place.",
  alternates: { canonical: "/sell-my-watch-london/" },
};

export default function London() {
  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/sell-my-watch">Sell my watch</Link> / London</nav>
      <div className="page-head">
        <span className="eyebrow">London</span>
        <h1>Sell my watch in London</h1>
        <p>If you are in London and have a luxury watch to sell, you have three options with us: sell it now, list it at your own price, or borrow against it.</p>
      </div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <h2>Your three options</h2>
          <ThreeWaysTable />
          <h2>How it works for London sellers</h2>
          <p>Start with the form: tell us the watch, its condition and your postcode. We review the details and contact you. We then agree with you how and where the watch will be inspected before any offer is confirmed.</p>
          <h2>Brands we look at</h2>
          <div className="filters">{BRANDS.map((b) => <Link key={b.slug} className="chip" href={`/sell/${b.slug}`}>Sell my {b.name}</Link>)}</div>
          <h2>Staying safe when selling a watch in London</h2>
          <p>Never hand over a watch until you are certain how you will be paid, and avoid meeting unknown buyers alone or carrying a valuable watch to an unfamiliar address. Our guide to <Link href="/guides/how-to-sell-a-luxury-watch">selling a luxury watch safely</Link> has a full checklist.</p>
        </div>
        <aside className="sticky" id="enquire"><LeadForm defaultIntent="sell" loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} /></aside>
      </div>
    </div>
  );
}
