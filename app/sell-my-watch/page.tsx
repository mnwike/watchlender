import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { SITE } from "@/lib/site";
import { BRANDS } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Sell my watch in London and the UK",
  description: `Sell your luxury watch. Tell us the brand, model and condition and we'll come back to you with an offer, subject to inspection. ${SITE.area}.`,
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
      <div className="detail">
        <div className="prose">
          <h2>What we need from you</h2>
          <p>The brand, model and reference number if you know it, the condition, and whether you still have the original box and papers. If you can find your watch in <Link href="/watches">our catalogue</Link>, start from its page and the details are filled in for you.</p>
          <h2>Brands we look at</h2>
          <div className="filters">{BRANDS.map((b) => <Link key={b.slug} className="chip" href={`/watches/${b.slug}`}>{b.name}</Link>)}</div>
          <h2>Would you rather keep it?</h2>
          <p>If you need funds but don&apos;t want to part with your watch, see <Link href="/watch-loans">loans against watches</Link>.</p>
        </div>
        <aside><LeadForm defaultIntent="sell" loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} /></aside>
      </div>
    </div>
  );
}
