import type { Metadata } from "next";
import Link from "next/link";
import { MetalShell, area, silverPerG } from "@/components/GoldExtras";
import { MetalLinks, PriceSource } from "@/components/MetalPages";
import { TROY_OUNCE_G, gbp, priceDate } from "@/lib/metals";

export const metadata: Metadata = {
  title: "Sell silver coins: pre-1920, pre-1947 and silver Britannias",
  description: `Sell silver coins. Which British coins contain silver, what the silver in each is worth at today's reference price, and how to get an offer. ${area}.`,
  alternates: { canonical: "/sell-silver-coins/" },
};

// Standard weights of pre-decimal British silver coins, in grams.
const COINS = [{ name: "Crown", g: 28.28 }, { name: "Half crown", g: 14.14 }, { name: "Florin (two shillings)", g: 11.31 }, { name: "Shilling", g: 5.66 }, { name: "Sixpence", g: 2.83 }];
const faqs = [
  { q: "Which British coins are silver?", a: "Circulating silver coins dated before 1920 are sterling silver (92.5%). Those dated 1920 to 1946 are 50% silver. From 1947 the same coins were made of cupro-nickel and contain no silver." },
  { q: "How much are pre-1947 silver coins worth?", a: `Mostly their silver value. A half crown dated 1920 to 1946 contains about 7.07 g of silver, worth ${gbp(7.07 * silverPerG())} at the reference spot price on ${priceDate()}. A buyer will pay less than the spot value.` },
  { q: "Should I sort my coins before selling?", a: "Yes. Separate coins dated before 1920 from those dated 1920 to 1946, because they contain different amounts of silver. Set aside anything in unusually good condition or with a scarce date." },
  { q: "Are any worth more than their silver?", a: "Some are. Scarce dates, older reigns, proof coins and coins with very little wear can be worth more to collectors. Do not clean them: cleaning reduces collector value." },
];

export default function Page() {
  return (
    <MetalShell crumbs={[{ href: "/sell-silver", label: "Sell silver" }, { label: "Sell silver coins" }]} eyebrow={area} h1="Sell silver coins" faqs={faqs} faqTitle="Selling silver coins: common questions"
      intro={<>Sell old British silver coins, silver Britannias and other silver coins for an offer based on their silver content and any collector value.</>}>
      <h2>The silver in old British coins</h2>
      <div className="table-scroll"><table className="compare"><thead><tr><th>Coin</th><th>Before 1920 (92.5%)</th><th>1920 to 1946 (50%)</th></tr></thead>
        <tbody>{COINS.map((c) => <tr key={c.name}><td>{c.name}</td><td>{gbp(c.g * 0.925 * silverPerG())}</td><td>{gbp(c.g * 0.5 * silverPerG())}</td></tr>)}
          <tr><td>Silver Britannia, 1 oz</td><td colSpan={2}>{gbp(TROY_OUNCE_G * silverPerG())} (one troy ounce of silver)</td></tr></tbody></table></div>
      <p style={{ fontSize: ".85rem", color: "var(--muted)" }}>Silver value of an unworn coin at the spot price. Worn coins weigh a little less. Coins dated 1947 or later contain no silver.</p>
      <PriceSource />
      <h2>What we need to know</h2>
      <ul>
        <li>Roughly how many coins, or their total weight, sorted into before 1920 and 1920 to 1946.</li>
        <li>Any modern silver coins such as Britannias, and whether they are in capsules or tubes.</li>
        <li>Anything you think may be scarce: tell us the date and denomination.</li>
      </ul>
      <p>Also: <Link href="/silver-price-uk">silver price UK</Link> · <Link href="/scrap-silver-price">scrap silver price</Link> · <Link href="/hallmarks/925-silver">what 925 means</Link> · <Link href="/sell-gold-coins">sell gold coins</Link></p>
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}
