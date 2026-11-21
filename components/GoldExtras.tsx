import Link from "next/link";
import type { ReactNode } from "react";
import { MetalForm, MetalLinks, PriceSource, PriceTable, calcProps } from "./MetalPages";
import MetalCalculator from "./MetalCalculator";
import { PURITIES, TROY_OUNCE_G, gbp, pricePerGram, priceDate, refPerOz, type Metal } from "@/lib/metals";
import { SITE } from "@/lib/site";
import { BarArt, CoinArt, HallmarkArt, JewelleryArt, RingArt } from "./MetalArt";

export { BarArt, CoinArt, HallmarkArt, JewelleryArt, RingArt };

export interface Faq { q: string; a: string }
type Crumb = { href?: string; label: string };

/** Shared two-column layout for the gold section: breadcrumb, heading, body, FAQ, enquiry form. */
export function MetalShell({ crumbs, eyebrow, h1, intro, faqs, faqTitle, art, children }: { crumbs: Crumb[]; eyebrow: string; h1: string; intro: ReactNode; faqs: Faq[]; faqTitle: string; art?: ReactNode; children: ReactNode }) {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{crumbs.map((c) => <span key={c.label}> / {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}</span>)}</nav>
      <div className="page-head"><span className="eyebrow">{eyebrow}</span><h1>{h1}</h1><p>{intro}</p></div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
          {art}
          {children}
          <section className="faq" style={{ padding: 0 }}>
            <h2>{faqTitle}</h2>
            {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        </div>
        <aside className="sticky" id="enquire"><MetalForm /></aside>
      </div>
    </div>
  );
}

// ---- Gold by carat -------------------------------------------------------
export const CARATS = [
  { slug: "9ct", label: "9ct", mark: "375", fineness: 0.375, parts: "9 parts gold in 24 (37.5%)", use: "It is the lowest standard that can be hallmarked as gold in the UK and the most common carat for everyday British jewellery." },
  { slug: "14ct", label: "14ct", mark: "585", fineness: 0.585, parts: "14 parts gold in 24 (58.5%)", use: "It is common in jewellery from continental Europe and North America, and less so in pieces made for the UK." },
  { slug: "18ct", label: "18ct", mark: "750", fineness: 0.75, parts: "18 parts gold in 24 (75%)", use: "It is the usual choice for fine jewellery, engagement rings and gold watch cases." },
  { slug: "22ct", label: "22ct", mark: "916", fineness: 0.916, parts: "22 parts gold in 24 (91.6%)", use: "It is used for sovereigns and Krugerrands, for many wedding bands and for much South Asian and Middle Eastern jewellery." },
  { slug: "24ct", label: "24ct", mark: "999", fineness: 0.999, parts: "pure gold (99.9% or finer)", use: "It is used for investment bars and bullion coins such as modern Britannias. It is too soft for most jewellery." },
] as const;
export const getCarat = (slug: string) => CARATS.find((c) => c.slug === slug);
export const caratPrice = (slug: string) => pricePerGram(refPerOz("gold")) * (getCarat(slug)?.fineness ?? 0);
const WEIGHTS = [1, 2, 5, 10, 20, 50, 100];

export function CaratPage({ slug }: { slug: string }) {
  const c = getCarat(slug)!;
  const perG = caratPrice(slug);
  const faqs: Faq[] = [
    { q: `What is the ${c.label} gold price per gram today?`, a: `At the reference spot price on ${priceDate()}, the gold in one gram of ${c.label} gold was worth ${gbp(perG)}. Pure gold was ${gbp(pricePerGram(refPerOz("gold")))} per gram on the same day.` },
    { q: `What does ${c.label} mean?`, a: `${c.label} gold is ${c.parts}. The rest is other metals added for strength and colour. Its UK hallmark number is ${c.mark}.` },
    { q: `How much is 10 grams of ${c.label} gold worth?`, a: `Ten grams of ${c.label} gold contained ${gbp(perG * 10)} of gold at the spot price on ${priceDate()}. A buyer will offer less than this.` },
    { q: `Is the scrap price for ${c.label} gold the same as this?`, a: `No. This is the value of the gold content at the spot price. A scrap price is what a buyer actually pays, which is lower to cover refining and their margin, and differs between buyers.` },
  ];
  return (
    <MetalShell crumbs={[{ href: "/sell-gold", label: "Gold and precious metals" }, { href: "/gold-price-per-gram", label: "Gold price per gram" }, { label: `${c.label} gold` }]} eyebrow={`Reference price · ${priceDate()}`} h1={`${c.label} gold price per gram`} art={<HallmarkArt mark={c.mark} metal="gold" />} faqs={faqs} faqTitle={`${c.label} gold questions`}
      intro={<>The gold in a gram of {c.label} ({c.mark}) gold was worth {gbp(perG)} at the spot price on {priceDate()}. {c.label} gold is {c.parts}.</>}>
      <div className="table-scroll"><table className="compare"><thead><tr><th>Weight of {c.label} gold</th><th>Gold value at spot</th></tr></thead>
        <tbody>{WEIGHTS.map((w) => <tr key={w}><td>{w} g</td><td>{gbp(perG * w)}</td></tr>)}<tr><td>1 troy ounce ({TROY_OUNCE_G.toFixed(2)} g)</td><td>{gbp(perG * TROY_OUNCE_G)}</td></tr></tbody></table></div>
      <PriceSource />
      <h2>About {c.label} gold</h2>
      <p>{c.label} gold is {c.parts}, hallmarked {c.mark}. {c.use} See our <Link href="/guides/uk-gold-hallmarks">hallmark guide</Link> if you are not sure which carat you have.</p>
      <h2>Work out your own item</h2>
      <MetalCalculator {...calcProps} initial="gold" />
      <h2>Other carats</h2>
      <p>{CARATS.filter((x) => x.slug !== slug).map((x, i) => <span key={x.slug}>{i > 0 ? " · " : ""}<Link href={`/gold-price-per-gram/${x.slug}`}>{x.label} gold: {gbp(caratPrice(x.slug))} per gram</Link></span>)}</p>
      <h2>What to do with it</h2>
      <MetalLinks />
    </MetalShell>
  );
}

// ---- Scrap prices --------------------------------------------------------
export function ScrapPage({ metal }: { metal: "gold" | "silver" }) {
  const perG = pricePerGram(refPerOz(metal));
  const first = PURITIES[metal][0];
  const faqs: Faq[] = [
    { q: `What is the scrap ${metal} price per gram?`, a: `Scrap ${metal} is priced from the spot price of the pure metal, which was ${gbp(perG)} per gram on ${priceDate()}. ${first.label} (${first.mark}) contained ${gbp(perG * first.fineness)} of ${metal} per gram. What a buyer pays is a proportion of that.` },
    { q: `What counts as scrap ${metal}?`, a: metal === "gold" ? "Any gold bought for its metal rather than as a wearable piece: broken chains, odd earrings, dented rings, dental gold and unwanted jewellery." : "Any silver bought for its metal: damaged cutlery and tableware, broken jewellery, odd spoons and worn coins. Silver-plated items (marked EPNS or similar) contain very little silver and are not bought as scrap silver." },
    { q: `Why do scrap prices differ between buyers?`, a: `Each buyer deducts their own refining cost and margin from the spot value, and some pay better rates for larger weights. Ask what price per gram you would be paid for your purity and compare.` },
    { q: `Should I scrap everything?`, a: `No. Coins, signed jewellery, pieces with stones and antique silver by known makers can be worth more than their metal. Keep those separate and ask before they are weighed in.` },
  ];
  return (
    <MetalShell crumbs={[{ href: `/sell-${metal}`, label: `Sell ${metal}` }, { label: `Scrap ${metal} price` }]} eyebrow={`Reference price · ${priceDate()}`} h1={`Scrap ${metal} price`} art={<JewelleryArt tone={metal} />} faqs={faqs} faqTitle={`Scrap ${metal} questions`}
      intro={<>Scrap {metal} is valued by weight and purity. The table shows the value of the {metal} in each purity at the spot price on {priceDate()}: the starting point for any scrap offer.</>}>
      <PriceTable metal={metal} />
      <PriceSource />
      <h2>How a scrap offer is worked out</h2>
      <ol>
        <li>The items are sorted by purity, using the hallmark or a test.</li>
        <li>Each group is weighed in grams.</li>
        <li>Weight is multiplied by the buyer&apos;s price per gram for that purity, which is below the spot value shown above.</li>
      </ol>
      <p>We do not publish a fixed payout rate, because it depends on what you have and how much. Tell us and we will give you a figure for your items.</p>
      <h2>Work out the spot value of your scrap</h2>
      <MetalCalculator {...calcProps} initial={metal} />
      <h2>Your options</h2>
      <MetalLinks />
      <p>Also: <Link href={`/${metal}-price-per-gram`}>{metal} price per gram</Link> · <Link href={metal === "gold" ? "/scrap-silver-price" : "/scrap-gold-price"}>scrap {metal === "gold" ? "silver" : "gold"} price</Link> · <Link href="/guides/uk-gold-hallmarks">reading hallmarks</Link></p>
    </MetalShell>
  );
}

// ---- Coins ---------------------------------------------------------------
export const KRUGERRANDS = [
  { name: "1 oz Krugerrand", fineOz: 1, gross: 33.93 },
  { name: "1/2 oz Krugerrand", fineOz: 0.5, gross: 16.97 },
  { name: "1/4 oz Krugerrand", fineOz: 0.25, gross: 8.48 },
  { name: "1/10 oz Krugerrand", fineOz: 0.1, gross: 3.39 },
];
export const COIN_TABLE = [
  { name: "Full sovereign", fineG: 7.3224, note: "22ct", href: "/gold-sovereign-value" },
  { name: "Half sovereign", fineG: 3.6612, note: "22ct", href: "/gold-sovereign-value" },
  { name: "Krugerrand, 1 oz", fineG: TROY_OUNCE_G, note: "22ct", href: "/krugerrand-value" },
  { name: "Britannia, 1 oz", fineG: TROY_OUNCE_G, note: "22ct before 2013, 24ct since", href: "/gold-britannia-value" },
];
export const goldPerG = () => pricePerGram(refPerOz("gold"));
export const area = SITE.area;

// ---- "[metal] price UK" ----------------------------------------------------
export function SpotPricePage({ metal }: { metal: "gold" | "silver" }) {
  const perOz = refPerOz(metal);
  const perG = pricePerGram(perOz);
  const faqs: Faq[] = [
    { q: `What is the ${metal} price in the UK today?`, a: `The reference spot price on ${priceDate()} was ${gbp(perOz)} per troy ounce, which is ${gbp(perG)} per gram and ${gbp(perG * 1000)} per kilo. We update this figure once a day, so it is not a live market price.` },
    { q: `Is this the price I can buy or sell ${metal} at?`, a: `No. The spot price is a wholesale benchmark for the pure metal. Dealers sell above it and buy below it, and the gap varies by product and by dealer.` },
    { q: `Why is ${metal} priced per troy ounce?`, a: `Precious metals are traded worldwide in troy ounces. A troy ounce is ${TROY_OUNCE_G.toFixed(2)} grams, about 10% heavier than the everyday ounce.` },
    { q: metal === "gold" ? "Is there VAT on gold in the UK?" : "Is there VAT on silver in the UK?", a: metal === "gold" ? "Investment gold, meaning bars and coins that meet set purity standards, is exempt from VAT in the UK. Gold jewellery is not. This is general information, not tax advice." : "Yes. Unlike investment gold, silver bars and coins are subject to VAT when bought new in the UK. This is general information, not tax advice." },
  ];
  return (
    <MetalShell crumbs={[{ href: `/sell-${metal}`, label: metal === "gold" ? "Gold and precious metals" : "Sell silver" }, { label: `${metal === "gold" ? "Gold" : "Silver"} price UK` }]} eyebrow={`Reference price · ${priceDate()}`} h1={`${metal === "gold" ? "Gold" : "Silver"} price UK`} art={metal === "gold" ? <BarArt /> : <CoinArt tone="silver" />} faqs={faqs} faqTitle={`${metal === "gold" ? "Gold" : "Silver"} price questions`}
      intro={<>The {metal} price in pounds was {gbp(perOz)} per troy ounce on {priceDate()}, or {gbp(perG)} per gram. This is a daily reference price, updated each morning, not a live feed.</>}>
      <div className="table-scroll"><table className="compare"><thead><tr><th>Pure {metal}</th><th>Price in pounds</th></tr></thead>
        <tbody><tr><td>Per gram</td><td>{gbp(perG)}</td></tr><tr><td>Per troy ounce</td><td>{gbp(perOz)}</td></tr><tr><td>Per kilo</td><td>{gbp(perG * 1000)}</td></tr></tbody></table></div>
      <PriceSource />
      <h2>{metal === "gold" ? "Gold" : "Silver"} price by purity</h2>
      <PriceTable metal={metal} />
      <h2>Work out what yours is worth</h2>
      <MetalCalculator {...calcProps} initial={metal} />
      <h2>More prices</h2>
      {metal === "gold"
        ? <p><Link href="/gold-price-per-gram">Gold price per gram</Link> · <Link href="/gold-bar-price">Gold bar price</Link> · <Link href="/gold-sovereign-value">Sovereign value</Link> · <Link href="/krugerrand-value">Krugerrand value</Link> · <Link href="/gold-britannia-value">Britannia value</Link> · <Link href="/scrap-gold-price">Scrap gold price</Link> · <Link href="/silver-price-uk">Silver price UK</Link></p>
        : <p><Link href="/silver-price-per-gram">Silver price per gram</Link> · <Link href="/scrap-silver-price">Scrap silver price</Link> · <Link href="/sell-silver-coins">Sell silver coins</Link> · <Link href="/hallmarks/925-silver">What 925 means</Link> · <Link href="/gold-price-uk">Gold price UK</Link></p>}
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}

// ---- Hallmark numbers ----------------------------------------------------
export const HALLMARKS = [
  { slug: "375-gold", mark: "375", metal: "gold" as Metal, name: "9 carat gold", carat: "9ct", fineness: 0.375, note: "It is the lowest gold standard hallmarked in the UK and the most common in British high-street jewellery." },
  { slug: "585-gold", mark: "585", metal: "gold" as Metal, name: "14 carat gold", carat: "14ct", fineness: 0.585, note: "It is common on jewellery from continental Europe and North America." },
  { slug: "750-gold", mark: "750", metal: "gold" as Metal, name: "18 carat gold", carat: "18ct", fineness: 0.75, note: "It is the usual standard for fine jewellery, engagement rings and gold watches." },
  { slug: "916-gold", mark: "916", metal: "gold" as Metal, name: "22 carat gold", carat: "22ct", fineness: 0.916, note: "It is used for sovereigns, many wedding bands and much South Asian and Middle Eastern jewellery." },
  { slug: "999-gold", mark: "999", metal: "gold" as Metal, name: "24 carat (fine) gold", carat: "24ct", fineness: 0.999, note: "It is found on investment bars and bullion coins, and rarely on jewellery because pure gold is soft." },
  { slug: "925-silver", mark: "925", metal: "silver" as Metal, name: "sterling silver", carat: "", fineness: 0.925, note: "It is the standard for British silver jewellery, cutlery and tableware." },
];
export const getHallmark = (slug: string) => HALLMARKS.find((h) => h.slug === slug);
export const hallmarkPrice = (slug: string) => { const h = getHallmark(slug)!; return pricePerGram(refPerOz(h.metal)) * h.fineness; };

export function HallmarkPage({ slug }: { slug: string }) {
  const h = getHallmark(slug)!;
  const perG = hallmarkPrice(slug);
  const pct = (h.fineness * 100).toFixed(1);
  const faqs: Faq[] = [
    { q: `What does ${h.mark} mean on ${h.metal === "gold" ? "gold" : "silver"}?`, a: `${h.mark} is a fineness mark. It means the metal is ${pct}% pure ${h.metal}: ${h.mark} parts in every 1,000. This standard is called ${h.name}.` },
    { q: `Is ${h.mark} ${h.metal} real ${h.metal}?`, a: `Yes. An item properly marked ${h.mark} is ${pct}% ${h.metal}, with other metals added for strength. A number stamped alone is not proof, though: a full UK hallmark also has an assay office mark, and a buyer will test the metal.` },
    { q: `How much is ${h.mark} ${h.metal} worth per gram?`, a: `At the reference spot price on ${priceDate()}, a gram of ${h.mark} ${h.metal} contained ${gbp(perG)} of ${h.metal}. A buyer will pay less than this.` },
    { q: `Is ${h.mark} ${h.metal} the same as ${h.metal}-plated?`, a: `No. ${h.mark} describes solid ${h.name}. Plated items carry different marks, such as ${h.metal === "gold" ? "GP, HGE, RGP or 'rolled gold'" : "EPNS, EP or 'silver plate'"}, and contain very little precious metal.` },
  ];
  return (
    <MetalShell crumbs={[{ href: `/sell-${h.metal}`, label: `Sell ${h.metal}` }, { href: "/guides/uk-gold-hallmarks", label: "Hallmarks" }, { label: `${h.mark} ${h.metal}` }]} eyebrow={`Hallmark ${h.mark}`} h1={`What does ${h.mark} mean on ${h.metal}?`} art={<HallmarkArt mark={h.mark} metal={h.metal === "silver" ? "silver" : "gold"} />} faqs={faqs} faqTitle={`${h.mark} ${h.metal} questions`}
      intro={<>{h.mark} stamped on {h.metal} means it is {pct}% pure: {h.name}. A gram of it contained {gbp(perG)} of {h.metal} at the spot price on {priceDate()}.</>}>
      <h2>{h.mark} = {h.name}</h2>
      <p>The number is the purity in parts per thousand. {h.mark} means {h.mark} parts {h.metal} and {1000 - Number(h.mark)} parts other metals. {h.note}</p>
      <h2>What {h.mark} {h.metal} is worth</h2>
      <div className="table-scroll"><table className="compare"><thead><tr><th>Weight</th><th>{h.metal === "gold" ? "Gold" : "Silver"} value at spot</th></tr></thead>
        <tbody>{[1, 5, 10, 20, 50].map((w) => <tr key={w}><td>{w} g</td><td>{gbp(perG * w)}</td></tr>)}</tbody></table></div>
      <PriceSource />
      <h2>Checking the mark</h2>
      <ul>
        <li>A full UK hallmark has three parts: the maker&apos;s mark, the fineness number and the assay office symbol.</li>
        <li>Look inside rings, on clasps and on the back of pendants. A magnifying glass helps.</li>
        <li>Items made abroad may show only the number. That is common, but it means the metal should be tested.</li>
      </ul>
      <p>See all the marks in our <Link href="/guides/uk-gold-hallmarks">guide to UK hallmarks</Link>{h.carat && <>, or the full <Link href={`/gold-price-per-gram/${h.carat}`}>{h.carat} gold price table</Link></>}.</p>
      <h2>Other marks</h2>
      <p>{HALLMARKS.filter((x) => x.slug !== slug).map((x, i) => <span key={x.slug}>{i > 0 ? " · " : ""}<Link href={`/hallmarks/${x.slug}`}>{x.mark} {x.metal}</Link></span>)}</p>
      <h2>Work out your own item</h2>
      <MetalCalculator {...calcProps} initial={h.metal} />
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}

export const GOLD_BARS = [
  { name: "1 g", g: 1 }, { name: "5 g", g: 5 }, { name: "10 g", g: 10 }, { name: "20 g", g: 20 }, { name: "1 oz", g: TROY_OUNCE_G },
  { name: "50 g", g: 50 }, { name: "100 g", g: 100 }, { name: "250 g", g: 250 }, { name: "500 g", g: 500 }, { name: "1 kg", g: 1000 },
];
export const silverPerG = () => pricePerGram(refPerOz("silver"));
