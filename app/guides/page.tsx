import type { Metadata } from "next";
import Link from "next/link";
import PageImage from "@/components/PageImage";
import { GUIDES } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guides for watch owners",
  description: "Plain guides to selling, listing, valuing and borrowing against a luxury watch.",
  alternates: { canonical: "/guides/" },
};

export default function Guides() {
  return (
    <div className="wrap">
      <div className="page-head"><h1>Guides for watch owners</h1><p>Plain answers on selling, listing, valuing and borrowing against a luxury watch.</p></div>
      <PageImage name="guides" position="35% 50%" />
      <div className="guide-list" style={{ marginTop: 18 }}>{GUIDES.map((g) => <Link key={g.slug} href={`/guides/${g.slug}`}><h3>{g.title}</h3><p>{g.description}</p></Link>)}</div>
    </div>
  );
}
