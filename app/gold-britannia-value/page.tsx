import type { Metadata } from "next";
import Link from "next/link";
import { MetalShell, goldPerG, CoinArt } from "@/components/GoldExtras";
import { MetalLinks, PriceSource } from "@/components/MetalPages";
import { TROY_OUNCE_G, gbp, priceDate } from "@/lib/metals";

const oz = goldPerG() * TROY_OUNCE_G;
const SIZES = [{ name: "1 oz Britannia", f: 1 }, { name: "1/2 oz Britannia", f: 0.5 }, { name: "1/4 oz Britannia", f: 0.25 }, { name: "1/10 oz Britannia", f: 0.1 }];
export const metadata: Metadata = {
  title: "Britannia gold coin value: 1 oz gold Britannia price",
  description: `The gold in a 1 oz Britannia gold coin was worth ${gbp(oz)} at the spot price on ${priceDate()}. Values for smaller sizes, the difference between older and newer coins, and how to sell.`,
  alternates: { canonical: "/gold-britannia-value/" },
};

const faqs = [
  { q: "How much is a gold Britannia worth?", a: `A one-ounce gold Britannia contains one troy ounce of pure gold, worth ${gbp(oz)} at the reference spot price on ${priceDate()}. Bullion Britannias normally trade close to that figure.` },
  { q: "Are all gold Britannias 24 carat?", a: "No. Britannias made from 1987 to 2012 are 22 carat, alloyed with other metals, and weigh 34.05 g. Coins made from 2013 are 24 carat (999.9 fine) and weigh 31.21 g. Both contain exactly one troy ounce of pure gold." },
  { q: "Is an older 22 carat Britannia worth less?", a: "Not for its gold: the gold content is the same. Some buyers prefer the newer 24 carat coins, and some early or proof issues carry a collector premium." },
  { q: "Do I pay tax when I sell a Britannia?", a: "Britannias are UK legal tender and, like sovereigns, are generally exempt from Capital Gains Tax for UK residents. This is general information, not tax advice: check your own position with HMRC or an adviser." },
];

export default function Page() {
  return (
    <MetalShell crumbs={[{ href: "/sell-gold", label: "Gold and precious metals" }, { href: "/sell-gold-coins", label: "Gold coins" }, { label: "Britannia value" }]} eyebrow={`Reference price · ${priceDate()}`} h1="Britannia gold coin value" art={<CoinArt />} faqs={faqs} faqTitle="Britannia questions"
      intro={<>The gold in a one-ounce Britannia was worth {gbp(oz)} at the spot price on {priceDate()}. Smaller Britannias are worth the same fraction of that.</>}>
      <div className="table-scroll"><table className="compare"><thead><tr><th>Coin</th><th>Pure gold</th><th>Gold value at spot</th></tr></thead>
        <tbody>{SIZES.map((s) => <tr key={s.name}><td>{s.name}</td><td>{(s.f * TROY_OUNCE_G).toFixed(2)} g</td><td>{gbp(oz * s.f)}</td></tr>)}</tbody></table></div>
      <PriceSource />
      <h2>Older and newer Britannias</h2>
      <p>The Royal Mint has struck the gold Britannia since 1987. Until 2012 it was made in 22 carat gold; since 2013 it has been 24 carat. Check the date on your coin: it does not change the gold content, but it tells a buyer which type you have.</p>
      <h2>Other gold coins</h2>
      <p><Link href="/gold-sovereign-value">Sovereign value</Link> · <Link href="/krugerrand-value">Krugerrand value</Link> · <Link href="/sell-gold-coins">Sell gold coins</Link></p>
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}
