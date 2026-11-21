import Link from "next/link";
import { BRANDS, WATCHES } from "@/lib/catalogue";
import { SITE } from "@/lib/site";
import WatchCard, { SearchBar } from "@/components/WatchCard";
import { ThreeWaysTable } from "@/components/ThreeWays";
import { GUIDES } from "@/data/guides";
import { NICKNAMES } from "@/data/nicknames";

const FEATURED = ["126610LN", "126710BLRO", "126500LN", "5711/1A-010", "15500ST.OO.1220ST.01", "310.30.42.50.01.001", "WSSA0018", "M79030N-0001"];

export default function Home() {
  const featured = FEATURED.map((r) => WATCHES.find((w) => w.referenceDisplay === r)!).filter(Boolean);
  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">{SITE.area}</span>
            <h1>Sell it now, list it, or borrow against it</h1>
            <p className="lede">Three ways to release the value in your luxury watch, in one place. Find your watch, then choose the route that suits you.</p>
            <SearchBar large />
            <small>{WATCHES.length} references across {BRANDS.length} brands, and growing.</small>
          </div>
          <div className="hero-art" style={{ flexDirection: "column", alignItems: "center", gap: 8 }}>
            <img
              src="/images/watchlender-homepage-hero.jpg"
              alt="Stainless-steel luxury diving watch with blue dial resting in an open presentation box"
              className="hero-photo"
              width={1600}
              height={1009}
              fetchPriority="high"
              style={{ objectFit: "cover", objectPosition: "center center", backgroundImage: "url('/watch-photos/rolex-submariner.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
            />
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="choices">
          <div className="choice">
            <h2>Sell now</h2>
            <p>Tell us what you have. We&apos;ll review the details and come back to you with an offer, subject to inspection.</p>
            <Link className="btn primary" href="/sell-my-watch">Get an offer</Link>
          </div>
          <div className="choice">
            <h2>List it</h2>
            <p>Set your own asking price and list your watch on WatchLender for buyers to find. Every listing is reviewed first.</p>
            <Link className="btn" href="/list-my-watch">List my watch</Link>
          </div>
          <div className="choice">
            <h2>Borrow</h2>
            <p>Keep ownership of your watch and use it as security. {SITE.loansMode === "waitlist" ? "Register your interest and we'll contact you when the service opens." : "Start an enquiry and we'll explain your options."}</p>
            <Link className="btn" href="/watch-loans">{SITE.loansMode === "waitlist" ? "Register interest" : "Enquire about a loan"}</Link>
          </div>
        </div>
      </div>

      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="section-head"><h2>One watch, three options</h2><Link href="/guides/sell-list-or-borrow">Which is right for me?</Link></div>
          <ThreeWaysTable />
          <p style={{ marginTop: 16 }}>Not sure what your watch is worth? <Link href="/watch-valuation">Request a valuation</Link> first.</p>
        </div>
      </section>

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
          <div className="section-head"><h2>Popular watches</h2><div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}><Link href="/watch-photo-gallery">Watch photo gallery</Link><Link href="/watches">Search the catalogue</Link></div></div>
          <div className="grid">{featured.map((w) => <WatchCard key={w.id} watch={w} />)}</div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>How it works</h2>
          <ol className="steps">
            <li><h3>Find your watch</h3><p>Search by reference number, or browse by brand and model until you find the exact one.</p></li>
            <li><h3>Choose your route</h3><p>Sell now, list it at your own price, or borrow against it. Tell us the condition and whether you have the box and papers.</p></li>
            <li><h3>We come back to you</h3><p>We review your enquiry and contact you. Any figure is provisional until the watch has been inspected.</p></li>
          </ol>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head"><h2>Know it by its nickname?</h2><Link href="/rolex-nicknames">All Rolex nicknames</Link></div>
          <div className="filters">{NICKNAMES.map((n) => <Link key={n.slug} className="chip" href={`/rolex/${n.slug}`}>Rolex {n.name}</Link>)}</div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="section-head"><h2>Guides for watch owners</h2><Link href="/guides">All guides</Link></div>
          <div className="guide-list">{GUIDES.slice(0, 3).map((g) => <Link key={g.slug} href={`/guides/${g.slug}`}><h3>{g.title}</h3><p>{g.description}</p></Link>)}</div>
        </div>
      </section>
    </>
  );
}
