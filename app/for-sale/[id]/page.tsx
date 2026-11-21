import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allListings, formatGBP, getListing } from "@/lib/listings";
import { SITE } from "@/lib/site";
import WatchArt from "@/components/WatchArt";
import BuyForm from "@/components/BuyForm";

type P = Promise<{ id: string }>;
export const dynamicParams = false;
// A static export needs at least one path; the placeholder renders a 404 while there are no listings.
export const generateStaticParams = () => (allListings().length ? allListings().map((l) => ({ id: l.id })) : [{ id: "none" }]);

export async function generateMetadata({ params }: { params: P }): Promise<Metadata> {
  const l = getListing((await params).id);
  if (!l) return { robots: { index: false } };
  return {
    title: `${l.title}${l.year ? ` (${l.year})` : ""} for sale`,
    description: `${l.title} for sale, ${l.condition.toLowerCase()} condition, ${l.boxPapers.toLowerCase()}. ${l.status === "live" ? formatGBP(l.priceGBP) : "Sold"}. ${l.location}.`,
    alternates: { canonical: l.url },
  };
}

export default async function ListingPage({ params }: { params: P }) {
  const l = getListing((await params).id);
  if (!l) notFound();
  const w = l.watch;
  const live = l.status === "live";
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: l.title, sku: l.id, mpn: w.referenceDisplay,
    brand: { "@type": "Brand", name: w.brand }, description: l.description,
    ...(l.photos.length ? { image: l.photos.map((p) => `${SITE.url}${p.src}`) } : {}),
    offers: { "@type": "Offer", price: l.priceGBP, priceCurrency: "GBP", itemCondition: "https://schema.org/UsedCondition", availability: live ? "https://schema.org/InStock" : "https://schema.org/SoldOut", url: `${SITE.url}${l.url}` },
  };
  const rows: [string, string][] = [
    ["Reference", w.referenceDisplay], ...(l.year ? ([["Year", String(l.year)]] as [string, string][]) : []), ["Condition", l.condition], ["Box and papers", l.boxPapers],
    ["Case", `${w.sizeMm ? `${w.sizeMm} mm ` : ""}${w.material}`], ["Dial", w.dial], ["Movement", w.movement], ["Location", l.location], ["Listed by", l.sellerType],
  ];
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/for-sale">For sale</Link> / {l.title}</nav>
      <div className="page-head">
        <span className="eyebrow">{w.brand} · {w.family}</span>
        <h1>{w.model} {w.referenceDisplay}</h1>
        <p className="price">{live ? formatGBP(l.priceGBP) : "Sold"}</p>
      </div>
      <div className="detail">
        <div>
          {l.photos.length ? l.photos.map((p) => <img key={p.src} src={p.src} alt={p.alt} className="photo" style={{ marginBottom: 12 }} />) : (
            <div className="detail-art"><WatchArt watch={w} size={230} /><small>Illustration only. Photographs of this watch have not been supplied.</small></div>
          )}
          <p>{l.description}</p>
          <table className="specs"><tbody>{rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table>
          <p><Link href={w.url}>About the {w.brand} {w.model} {w.referenceDisplay}</Link></p>
        </div>
        <aside className="sticky" id="enquire">
          {live ? <BuyForm listingId={l.id} title={l.title} endpoint={SITE.leadEndpoint} /> : <div className="lead-form done"><h3>This watch has sold</h3><p><Link href="/for-sale">See watches currently for sale</Link></p></div>}
        </aside>
      </div>
    </div>
  );
}
