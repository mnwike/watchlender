import Link from "next/link";
import { METAL_PRICES } from "@/data/metal-prices";
import { GOLD_COINS, METAL_NAME, PURITIES, TROY_OUNCE_G, gbp, pricePerGram, priceDate, refPerOz, type Metal } from "@/lib/metals";
import { SITE } from "@/lib/site";
import LeadForm from "./LeadForm";
import MetalCalculator from "./MetalCalculator";

const waitlist = SITE.loansMode === "waitlist";
export const calcProps = { prices: { ...METAL_PRICES.perOzGBP }, asOf: priceDate(), sourceName: METAL_PRICES.source.name };

export function PriceTable({ metal }: { metal: Metal }) {
  const perOz = refPerOz(metal);
  return (
    <div className="table-scroll">
      <table className="compare">
        <thead><tr><th>Purity</th><th>Hallmark</th><th>Per gram</th><th>Per troy ounce</th></tr></thead>
        <tbody>{PURITIES[metal].map((p) => <tr key={p.mark} id={p.label.toLowerCase().replace(/\s+/g, "-")}><td>{metal === "gold" ? <Link href={`/gold-price-per-gram/${p.label}`}>{p.label}</Link> : p.label}</td><td>{(metal === "gold" || p.mark === "925") ? <Link href={`/hallmarks/${p.mark}-${metal}`}>{p.mark}</Link> : p.mark}</td><td>{gbp(pricePerGram(perOz) * p.fineness)}</td><td>{gbp(perOz * p.fineness)}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export function PriceSource() {
  return <p style={{ fontSize: ".85rem", color: "var(--muted)" }}>Spot prices as of {priceDate()}, from <a href={METAL_PRICES.source.url} rel="nofollow noopener">{METAL_PRICES.source.name}</a>. They are reference prices for the pure metal, not an offer to buy, and they change every trading day.</p>;
}

export function MetalLinks() {
  return (
    <div className="three-up">
      <Link href="/sell-gold"><strong>Sell it</strong><span>Tell us what you have for an offer</span></Link>
      <Link href="/gold-price-calculator"><strong>Value it</strong><span>Work out the metal value yourself</span></Link>
      <Link href="/gold-loans"><strong>Borrow</strong><span>{waitlist ? "Register interest in a loan" : "Use it as security for a loan"}</span></Link>
    </div>
  );
}

export function MetalForm({ intent = "sell" }: { intent?: "sell" | "loan" | "value" }) {
  return <LeadForm defaultIntent={intent} loansMode={SITE.loansMode} endpoint={SITE.leadEndpoint} itemLabel="What do you have?" itemPlaceholder="e.g. 9ct gold chain, 12 g" noList />;
}

/** "[metal] price per gram" page body. */
export function PricePerGramPage({ metal }: { metal: Metal }) {
  const name = METAL_NAME[metal];
  const perG = pricePerGram(refPerOz(metal));
  const lead = PURITIES[metal][0];
  const faqs = [
    { q: `What is the ${metal} price per gram in the UK?`, a: `On ${priceDate()} the reference spot price was ${gbp(perG)} per gram for pure ${metal} (${gbp(refPerOz(metal))} per troy ounce). ${lead.label} (${lead.mark}) works out at ${gbp(perG * lead.fineness)} per gram.` },
    { q: `How is the price per gram worked out?`, a: `The spot price is quoted per troy ounce, which is ${TROY_OUNCE_G.toFixed(2)} grams. Divide by that for the price of a gram of pure metal, then multiply by the purity of your item.` },
    { q: `Will I be paid the spot price for my ${metal}?`, a: `No. The spot price is the value of the pure metal. Buyers pay less, to cover refining and their margin, and how much less varies between buyers, so it is worth comparing offers.` },
  ];
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/sell-gold">Gold and precious metals</Link> / {name} price per gram</nav>
      <div className="page-head">
        <span className="eyebrow">Reference price · {priceDate()}</span>
        <h1>{name} price per gram</h1>
        <p>Pure {metal} was {gbp(perG)} per gram on {priceDate()}. The table shows what that means for each purity, per gram and per troy ounce.</p>
      </div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <PriceTable metal={metal} />
          <PriceSource />
          {metal === "gold" && (
            <>
              <h2>Gold coins</h2>
              <div className="table-scroll"><table className="compare"><thead><tr><th>Coin</th><th>Fine gold</th><th>Gold value at spot</th></tr></thead>
                <tbody>{GOLD_COINS.map((c) => <tr key={c.name}><td>{c.name}</td><td>{c.fineGrams.toFixed(2)} g</td><td>{gbp(c.fineGrams * perG)}</td></tr>)}</tbody></table></div>
              <p style={{ fontSize: ".85rem", color: "var(--muted)" }}>Gold content only. Coins in good condition often sell for more than their gold value. See <Link href="/gold-sovereign-value">sovereign value</Link>, <Link href="/krugerrand-value">Krugerrand value</Link> and <Link href="/sell-gold-coins">sell gold coins</Link>.</p>
            </>
          )}
          <h2>Work out your own {metal}</h2>
          <MetalCalculator {...calcProps} initial={metal} />
          <h2>What to do with it</h2>
          <MetalLinks />
          <p>Other metals: {(["gold", "silver", "platinum"] as Metal[]).filter((m) => m !== metal).map((m, i) => <span key={m}>{i > 0 ? " · " : ""}<Link href={`/${m}-price-per-gram`}>{METAL_NAME[m]} price per gram</Link></span>)} · <Link href={`/${metal === "platinum" ? "gold" : metal}-price-uk`}>{metal === "platinum" ? "Gold" : METAL_NAME[metal]} price UK</Link> · <Link href="/guides/uk-gold-hallmarks">How to read UK hallmarks</Link></p>
          <section className="faq" style={{ padding: 0 }}>
            <h2>{name} price questions</h2>
            {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        </div>
        <aside className="sticky" id="enquire"><MetalForm /></aside>
      </div>
    </div>
  );
}

/** "Sell [metal]" page body. */
export function SellMetalPage({ metal }: { metal: Metal }) {
  const name = METAL_NAME[metal];
  const items = { gold: "chains, rings, bracelets, coins, bars and scrap or broken gold", silver: "sterling silver jewellery, cutlery, tableware, coins and bars", platinum: "platinum rings, jewellery, coins and bars" }[metal];
  const faqs = [
    { q: `How do I sell my ${metal}?`, a: `Tell us what you have, its hallmark or purity if you know it, and roughly what it weighs. We review the details and come back to you with an offer, which is confirmed once the items have been tested and weighed.` },
    { q: `How much is my ${metal} worth?`, a: `Its metal value is its weight multiplied by its purity and the price per gram. On ${priceDate()} pure ${metal} was ${gbp(pricePerGram(refPerOz(metal)))} per gram at spot. Use our calculator for your own items. An offer will be below the spot value.` },
    { q: `Do you buy broken or unhallmarked ${metal}?`, a: `Broken and damaged items still contain metal and can be valued by weight. Unhallmarked items need to be tested to confirm their purity before any offer.` },
    { q: `Can I borrow against my ${metal} instead?`, a: waitlist ? `We are preparing a loan service. Choose "Borrow" in the form to register your interest. This is not an offer of credit.` : `Yes. Choose "Borrow" in the form and we will explain how a loan secured on your items would work.` },
  ];
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / Sell {metal}</nav>
      <div className="page-head">
        <span className="eyebrow">{SITE.area}</span>
        <h1>Sell {metal}</h1>
        <p>Sell your {metal} for an offer based on its weight and purity, or borrow against it. We look at {items}.</p>
      </div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          <h2>Today&apos;s reference {metal} prices</h2>
          <PriceTable metal={metal} />
          <PriceSource />
          <h2>Work out the metal value</h2>
          <MetalCalculator {...calcProps} initial={metal} />
          <h2>Before you sell</h2>
          <ul>
            <li>Look for the hallmark, which tells you the purity. Our <Link href="/guides/uk-gold-hallmarks">hallmark guide</Link> shows what the numbers mean.</li>
            <li>Weigh your items on kitchen or jewellery scales for a rough figure.</li>
            <li>Keep items with stones or by well-known makers separate: they can be worth more than their metal. See <Link href="/sell-jewellery">sell jewellery</Link>.</li>
            <li>Compare offers. Buyers pay different proportions of the spot value.</li>
          </ul>
          <p>Also: {(["gold", "silver", "platinum"] as Metal[]).filter((m) => m !== metal).map((m, i) => <span key={m}>{i > 0 ? " · " : ""}<Link href={`/sell-${m}`}>sell {m}</Link></span>)} · <Link href={`/${metal}-price-per-gram`}>{metal} price per gram</Link>{metal !== "platinum" && <> · <Link href={`/scrap-${metal}-price`}>scrap {metal} price</Link></>}{metal === "gold" && <> · <Link href="/sell-gold-coins">sell gold coins</Link> · <Link href="/sell-gold-ring">sell a gold ring</Link></>}{metal === "silver" && <> · <Link href="/sell-silver-coins">sell silver coins</Link> · <Link href="/sell-silver-cutlery">sell silver cutlery</Link></>}</p>
          <section className="faq" style={{ padding: 0 }}>
            <h2>Selling {metal}: common questions</h2>
            {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        </div>
        <aside className="sticky" id="enquire"><MetalForm /></aside>
      </div>
    </div>
  );
}
