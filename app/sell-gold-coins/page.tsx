import type { Metadata } from "next";
import Link from "next/link";
import { COIN_TABLE, MetalShell, area, goldPerG } from "@/components/GoldExtras";
import { MetalLinks, PriceSource } from "@/components/MetalPages";
import { gbp, priceDate } from "@/lib/metals";

export const metadata: Metadata = {
  title: "Sell gold coins: sovereigns, Krugerrands and Britannias",
  description: `Sell gold sovereigns, Krugerrands, Britannias and other gold coins. Today's gold value for each coin, what adds a premium, and how to get an offer. ${area}.`,
  alternates: { canonical: "/sell-gold-coins/" },
};

const faqs = [
  { q: "How do I sell gold coins?", a: "Tell us which coins you have, how many, and their dates if you can read them. We come back to you with an offer, which is confirmed once the coins have been checked and weighed." },
  { q: "How much will I get for a gold coin?", a: `Bullion coins sell for a figure close to the value of their gold. A full sovereign contained ${gbp(7.3224 * goldPerG())} of gold at the spot price on ${priceDate()}. An offer will be a little below the gold value.` },
  { q: "Should I clean my coins first?", a: "No. Cleaning removes the original surface and can reduce what a collector would pay. Leave them as they are." },
  { q: "Are some coins worth more than their gold?", a: "Yes. Scarce dates and mint marks, proof coins, boxed sets with certificates and coins in exceptional condition can carry a premium. Give us the dates so those are not valued as bullion." },
];

export default function Page() {
  return (
    <MetalShell crumbs={[{ href: "/sell-gold", label: "Sell gold" }, { label: "Sell gold coins" }]} eyebrow={area} h1="Sell gold coins" faqs={faqs} faqTitle="Selling gold coins: common questions"
      intro={<>Sell sovereigns, Krugerrands, Britannias and other gold coins for an offer based on their gold content and any collector value, or borrow against them instead.</>}>
      <h2>What the gold in common coins is worth</h2>
      <div className="table-scroll"><table className="compare"><thead><tr><th>Coin</th><th>Pure gold</th><th>Carat</th><th>Gold value at spot</th></tr></thead>
        <tbody>{COIN_TABLE.map((c) => <tr key={c.name}><td>{c.href ? <Link href={c.href}>{c.name}</Link> : c.name}</td><td>{c.fineG.toFixed(2)} g</td><td>{c.note}</td><td>{gbp(c.fineG * goldPerG())}</td></tr>)}</tbody></table></div>
      <PriceSource />
      <h2>What we need to know</h2>
      <ul>
        <li>The type of coin and how many you have.</li>
        <li>The dates, and for sovereigns the monarch shown.</li>
        <li>Whether any are proof coins or come in a box with a certificate.</li>
        <li>Anything mounted in a ring or pendant: mounts can mark a coin, so say so.</li>
      </ul>
      <h2>Your options</h2>
      <MetalLinks />
    </MetalShell>
  );
}
