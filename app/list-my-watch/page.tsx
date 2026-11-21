import PageImage from "@/components/PageImage";
import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "List your watch for sale",
  description: `List your luxury watch for sale on ${SITE.name} at your own asking price. Every listing is reviewed before it appears. ${SITE.area}.`,
  alternates: { canonical: "/list-my-watch/" },
};

export default function ListMyWatch() {
  return (
    <div className="wrap">
      <div className="page-head">
        <span className="eyebrow">{SITE.area}</span>
        <h1>List your watch for sale</h1>
        <p>Set your asking price and list your watch for buyers to find. If you would rather sell quickly, you can <Link href="/sell-my-watch">sell it to us</Link> instead.</p>
      </div>
      <PageImage name="list" />
      <div className="detail">
        <div className="prose">
          <h2>How listing works</h2>
          <ol className="steps" style={{ gridTemplateColumns: "1fr" }}>
            <li><h3>Tell us about your watch</h3><p>The model, condition, box and papers, and the price you want.</p></li>
            <li><h3>We review it</h3><p>We check the details with you and ask for photographs before anything is published.</p></li>
            <li><h3>Buyers enquire</h3><p>Your listing appears on the site and on the page for your watch&apos;s reference. We pass on genuine enquiries.</p></li>
          </ol>
          <h2>Three ways to use your watch</h2>
          <p><strong>Sell it to us</strong> for speed, <strong>list it</strong> at your own price if you can wait for the right buyer, or <Link href="/watch-loans">borrow against it</Link> and keep it.</p>
          <p className="note">We do not yet handle payment between buyers and sellers, and listing here is not a guarantee of sale.</p>
        </div>
        <aside><LeadForm defaultIntent="list" loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} /></aside>
      </div>
    </div>
  );
}
