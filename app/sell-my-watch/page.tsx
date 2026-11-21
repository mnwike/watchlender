import PageImage from "@/components/PageImage";
import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { SITE } from "@/lib/site";
import { BRANDS } from "@/lib/catalogue";
import { ThreeWaysTable } from "@/components/ThreeWays";

export const metadata: Metadata = {
  title: "Sell my watch: sell now, list or borrow",
  description: `Sell your luxury watch now, list it at your own price, or borrow against it, all in one place. ${SITE.area}.`,
  alternates: { canonical: "/sell-my-watch/" },
};

export default function Sell() {
  return (
    <div className="wrap">
      <div className="page-head">
        <span className="eyebrow">{SITE.area}</span>
        <h1>Sell my watch</h1>
        <p>Tell us which watch you have and what condition it is in. We review every enquiry and contact you with an offer, which is confirmed once the watch has been inspected.</p>
      </div>
      <PageImage name="sell" position="80% 60%" />
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <h2>Sell now, list or borrow</h2>
          <ThreeWaysTable />
          <h2>What we need from you</h2>
          <p>The brand, model and reference number if you know it, the condition, and whether you still have the original box and papers. If you can find your watch in <Link href="/watches">our catalogue</Link>, start from its page and the details are filled in for you.</p>
          <h2>Sell by brand</h2>
          <div className="filters">{BRANDS.map((b) => <Link key={b.slug} className="chip" href={`/sell/${b.slug}`}>Sell my {b.name}</Link>)}</div>
          <p>In London? See <Link href="/sell-my-watch-london">sell my watch in London</Link>. Not sure what it is worth? <Link href="/watch-valuation">Request a valuation</Link>.</p>
          <h2>Would you rather keep it?</h2>
          <p>If you need funds but don&apos;t want to part with your watch, see <Link href="/watch-loans">loans against watches</Link>.</p>
        </div>
        <aside><LeadForm defaultIntent="sell" loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} /></aside>
      </div>
    </div>
  );
}
