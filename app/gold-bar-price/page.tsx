import type { Metadata } from "next";
import Link from "next/link";
import { GOLD_BARS, MetalShell, goldPerG } from "@/components/GoldExtras";
import { MetalLinks, PriceSource } from "@/components/MetalPages";
import { TROY_OUNCE_G, gbp, priceDate } from "@/lib/metals";

const oz = goldPerG() * TROY_OUNCE_G;
export const metadata: Metadata = {
  title: "Gold bar price UK: 1g to 1kg and 1oz gold bars",
  description: `Gold bar prices at spot on ${priceDate()}: a 1 oz gold bar contained ${gbp(oz)} of gold and a 1 kg bar ${gbp(goldPerG() * 1000)}. Values for every common size and how to sell a bar.`,
  alternates: { canonical: "/gold-bar-price/" },
};

const faqs = [
  { q: "How much is a 1oz gold bar worth?", a: `A one-ounce bar of fine gold contained ${gbp(oz)} of gold at the reference spot price on ${priceDate()}. Dealers sell bars for a little more than this and buy them back for a little less.` },
  { q: "How much is a 1kg gold bar worth?", a: `A one-kilo bar contained ${gbp(goldPerG() * 1000)} of gold at the spot price on ${priceDate()}.` },
  { q: "Do smaller bars cost more per gram?", a: "To buy, yes. Small bars carry a higher premium over the spot price because each one costs about the same to make and package. When you sell, the offer is based mainly on the gold content." },
  { q: "What do I need to sell a gold bar?", a: "The bar itself, in its sealed packaging or with its assay certificate if you have them. A bar from a recognised refiner that is still sealed is the easiest to sell. Any bar will be checked and weighed before an offer is confirmed." },
];

export default function Page() {
  return (
    <MetalShell crumbs={[{ href: "/sell-gold", label: "Gold and precious metals" }, { label: "Gold bar price" }]} eyebrow={`Reference price · ${priceDate()}`} h1="Gold bar price" faqs={faqs} faqTitle="Gold bar questions"
      intro={<>A 1 oz gold bar contained {gbp(oz)} of gold at the spot price on {priceDate()}. The table shows the gold value of each common bar size, assuming fine (999.9) gold.</>}>
      <div className="table-scroll"><table className="compare"><thead><tr><th>Bar size</th><th>Gold value at spot</th></tr></thead>
        <tbody>{GOLD_BARS.map((b) => <tr key={b.name}><td>{b.name}</td><td>{gbp(b.g * goldPerG())}</td></tr>)}</tbody></table></div>
      <PriceSource />
      <h2>What a bar actually sells for</h2>
      <p>These are the values of the gold itself. A new bar costs more than its spot value, and a buyer pays slightly less than spot when you sell. The brand of the refiner, the packaging and the certificate all affect how easily a bar sells.</p>
      <h2>More gold prices</h2>
      <p><Link href="/gold-price-uk">Gold price UK</Link> · <Link href="/gold-price-per-gram">Gold price per gram</Link> · <Link href="/sell-gold-coins">Gold coins</Link></p>
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}
