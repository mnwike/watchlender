import Link from "next/link";
import { BRANDS, WATCHES } from "@/lib/catalogue";
import { SITE } from "@/lib/site";
import WatchCard, { SearchBar } from "@/components/WatchCard";
import WatchArt from "@/components/WatchArt";

const FEATURED = ["126610LN", "126710BLRO", "126500LN", "5711/1A-010", "15500ST.OO.1220ST.01", "310.30.42.50.01.001", "WSSA0018", "M79030N-0001"];

export default function Home() {
  const featured = FEATURED.map((r) => WATCHES.find((w) => w.referenceDisplay === r)!).filter(Boolean);
  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">{SITE.area}</span>
            <h1>Sell your luxury watch, or borrow against it</h1>
            <p className="lede">Find your exact watch by brand, model or reference number, then tell us whether you want to sell it or use it as security for a loan.</p>
            <SearchBar large />
            <small>{WATCHES.length} references across {BRANDS.length} brands, and growing.</small>
          </div>
          <div className="hero-art"><WatchArt watch={{ brand: "", model: "hero", material: "Steel and yellow gold", dial: "Green", bezel: "Green" }} size={250} /></div>
        </div>
      </div>

      <div className="wrap">
        <div className="choices">
          <div className="choice">
            <h2>Sell it to us</h2>
            <p>Tell us what you have. We&apos;ll review the details and come back to you with an offer, subject to inspection.</p>
            <Link className="btn primary" href="/sell-my-watch">Get an offer</Link>
          </div>
          <div className="choice">
            <h2>List it for sale</h2>
            <p>Set your own asking price and list your watch on WatchLender for buyers to find. Every listing is reviewed first.</p>
            <Link className="btn" href="/list-my-watch">List my watch</Link>
          </div>
          <div className="choice">
            <h2>Borrow against my watch</h2>
            <p>Keep ownership of your watch and use it as security. {SITE.loansMode === "waitlist" ? "Register your interest and we'll contact you when the service opens." : "Start an enquiry and we'll explain your options."}</p>
            <Link className="btn" href="/watch-loans">{SITE.loansMode === "waitlist" ? "Register interest" : "Enquire about a loan"}</Link>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="section-head"><h2>Browse by brand</h2><Link href="/watches">View all watches</Link></div>
          <div className="brands">
            {BRANDS.map((b) => (
              <Link key={b.slug} href={`/watches/${b.slug}`} className="brand-tile">
                <strong>{b.name}</strong>
                <span>{b.count} {b.count === 1 ? "reference" : "references"}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="section-head"><h2>Popular watches</h2><Link href="/watches">Search the catalogue</Link></div>
          <div className="grid">{featured.map((w) => <WatchCard key={w.id} watch={w} />)}</div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>How it works</h2>
          <ol className="steps">
            <li><h3>Find your watch</h3><p>Search by reference number, or browse by brand and model until you find the exact one.</p></li>
            <li><h3>Tell us about it</h3><p>Condition, box and papers, and whether you want to sell or borrow. It takes a couple of minutes.</p></li>
            <li><h3>We come back to you</h3><p>We review your enquiry and contact you. Any figure is provisional until the watch has been inspected.</p></li>
          </ol>
        </div>
      </section>
    </>
  );
}
