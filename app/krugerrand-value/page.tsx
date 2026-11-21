import type { Metadata } from "next";
import Link from "next/link";
import { KRUGERRANDS, MetalShell, goldPerG, CoinArt } from "@/components/GoldExtras";
import { MetalLinks, PriceSource } from "@/components/MetalPages";
import { TROY_OUNCE_G, gbp, priceDate } from "@/lib/metals";

const oz = goldPerG() * TROY_OUNCE_G;
export const metadata: Metadata = {
  title: "Krugerrand value: 1 oz gold Krugerrand price today",
  description: `The gold in a 1 oz Krugerrand was worth ${gbp(oz)} at the spot price on ${priceDate()}. Values for the 1/2, 1/4 and 1/10 oz coins, and how to sell.`,
  alternates: { canonical: "/krugerrand-value/" },
};

const faqs = [
  { q: "How much is a Krugerrand worth?", a: `A one-ounce Krugerrand contains exactly one troy ounce of pure gold, worth ${gbp(oz)} at the reference spot price on ${priceDate()}. Coins normally trade close to that figure, a little above when bought and a little below when sold.` },
  { q: "How much gold is in a Krugerrand?", a: "The one-ounce coin contains one troy ounce (31.10 g) of pure gold. It is made of 22 carat gold alloyed with copper, so the whole coin weighs 33.93 g. The copper is what gives it its reddish colour." },
  { q: "Are older Krugerrands worth more?", a: "Mostly no. Krugerrands are bullion coins made in large numbers, so the year rarely matters. Proof coins and a few scarce early years can carry a premium." },
  { q: "How do I know my Krugerrand is genuine?", a: "A genuine one-ounce coin weighs 33.93 g and measures about 32.8 mm across. A buyer will check weight, size and metal before making an offer." },
];

export default function Page() {
  return (
    <MetalShell crumbs={[{ href: "/sell-gold", label: "Gold and precious metals" }, { label: "Krugerrand value" }]} eyebrow={`Reference price · ${priceDate()}`} h1="Krugerrand value" art={<CoinArt />} faqs={faqs} faqTitle="Krugerrand questions"
      intro={<>The gold in a one-ounce Krugerrand was worth {gbp(oz)} at the spot price on {priceDate()}. Smaller Krugerrands are worth the same fraction of that.</>}>
      <div className="table-scroll"><table className="compare"><thead><tr><th>Coin</th><th>Pure gold</th><th>Total weight</th><th>Gold value at spot</th></tr></thead>
        <tbody>{KRUGERRANDS.map((k) => <tr key={k.name}><td>{k.name}</td><td>{(k.fineOz * TROY_OUNCE_G).toFixed(2)} g</td><td>{k.gross.toFixed(2)} g</td><td>{gbp(oz * k.fineOz)}</td></tr>)}</tbody></table></div>
      <PriceSource />
      <h2>How the value is worked out</h2>
      <p>A Krugerrand is valued on its pure gold content, not its total weight. Multiply the gold content by the <Link href="/gold-price-per-gram">gold price per gram</Link>, which was {gbp(goldPerG())} on {priceDate()}.</p>
      <h2>Other gold coins</h2>
      <p><Link href="/gold-sovereign-value">Gold sovereign value</Link> · <Link href="/sell-gold-coins">Sell gold coins</Link></p>
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}
