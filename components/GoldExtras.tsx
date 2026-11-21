import Link from "next/link";
import type { ReactNode } from "react";
import { MetalForm, MetalLinks, PriceSource, PriceTable, calcProps } from "./MetalPages";
import MetalCalculator from "./MetalCalculator";
import { PURITIES, TROY_OUNCE_G, gbp, pricePerGram, priceDate, refPerOz, type Metal } from "@/lib/metals";
import { SITE } from "@/lib/site";

export interface Faq { q: string; a: string }
type Crumb = { href?: string; label: string };

/** Shared two-column layout for the gold section: breadcrumb, heading, body, FAQ, enquiry form. */
export function MetalShell({ crumbs, eyebrow, h1, intro, faqs, faqTitle, children }: { crumbs: Crumb[]; eyebrow: string; h1: string; intro: ReactNode; faqs: Faq[]; faqTitle: string; children: ReactNode }) {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{crumbs.map((c) => <span key={c.label}> / {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}</span>)}</nav>
      <div className="page-head"><span className="eyebrow">{eyebrow}</span><h1>{h1}</h1><p>{intro}</p></div>
      <div className="detail">
        <div className="prose" style={{ maxWidth: "none" }}>
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
    <MetalShell crumbs={[{ href: "/sell-gold", label: "Gold and precious metals" }, { href: "/gold-price-per-gram", label: "Gold price per gram" }, { label: `${c.label} gold` }]} eyebrow={`Reference price · ${priceDate()}`} h1={`${c.label} gold price per gram`} faqs={faqs} faqTitle={`${c.label} gold questions`}
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
    <MetalShell crumbs={[{ href: `/sell-${metal}`, label: `Sell ${metal}` }, { label: `Scrap ${metal} price` }]} eyebrow={`Reference price · ${priceDate()}`} h1={`Scrap ${metal} price`} faqs={faqs} faqTitle={`Scrap ${metal} questions`}
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
  { name: "Britannia, 1 oz", fineG: TROY_OUNCE_G, note: "22ct before 2013, 24ct since" },
];
export const goldPerG = () => pricePerGram(refPerOz("gold"));
export const area = SITE.area;
