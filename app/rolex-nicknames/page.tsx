import type { Metadata } from "next";
import Link from "next/link";
import { NICKNAMES } from "@/data/nicknames";
import { ThreeWaysLinks } from "@/components/ThreeWays";

export const metadata: Metadata = {
  title: "Rolex nicknames explained: Batman, Pepsi, Hulk and more",
  description: "What collectors mean by Rolex Batman, Pepsi, Hulk, Kermit, Starbucks, Root Beer, Sprite, Panda and Wimbledon, with the reference number for each.",
  alternates: { canonical: "/rolex-nicknames/" },
};

export default function Nicknames() {
  return (
    <div className="wrap">
      <div className="page-head">
        <h1>Rolex nicknames explained</h1>
        <p>Collectors rarely use reference numbers in conversation. These are the nicknames you will hear most, what each one means and the reference it belongs to. None of them are official Rolex names.</p>
      </div>
      <div className="table-scroll">
        <table className="compare">
          <thead><tr><th>Nickname</th><th>Model</th><th>Reference numbers</th></tr></thead>
          <tbody>{NICKNAMES.map((n) => <tr key={n.slug}><td><Link href={`/rolex/${n.slug}`}>Rolex {n.name}</Link></td><td>{n.model}</td><td>{n.refs.join(", ")}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="guide-list" style={{ marginTop: 22 }}>{NICKNAMES.map((n) => <Link key={n.slug} href={`/rolex/${n.slug}`}><h3>Rolex {n.name}</h3><p>{n.summary.split(". ")[0]}.</p></Link>)}</div>
      <h2 style={{ marginTop: 30 }}>Own one of these?</h2>
      <ThreeWaysLinks />
    </div>
  );
}
